import { useEffect, useState } from "react";
import supabase from "../../../../../../client.js";
import "./Inventory.styles.css";
import { useCharacter } from "../../../../../../context/CharacterContext.jsx";
import GIF from "../../../../../../assets/d20-roll-color.gif";
const ITEM_TYPES = {
  equipment: "Equipment",
  raw_goods: "Raw Goods",
  magic_items: "Magic Items",
  black_market_goods: "Black Market",
};

function Inventory({ merchantId }) {
  const [inventory, setInventory] = useState({
    equipment: [],
    raw_goods: [],
    magic_items: [],
    black_market_goods: [],
    quantityMap: {},
  });
  const { character, relationships } = useCharacter();
  const [discountPercent, setDiscountPercent] = useState(0);
  const [haggleMessage, setHaggleMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [finalPrice, setFinalPrice] = useState(null);
  const [confirmClose, setConfirmClose] = useState(false);
  const [haggleLoading, setHaggleLoading] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);

      const { data: invRows, error } = await supabase
        .from("merchant_inventory")
        .select("*")
        .eq("merchant_id", merchantId);
      // Map item_id to quantity
      const quantityMap = {};
      invRows.forEach((row) => {
        quantityMap[row.item_id] = row.quantity;
      });

      if (error) {
        console.error("Error loading inventory:", error);
        return;
      }

      const grouped = {
        equipment: [],
        raw_goods: [],
        magic_items: [],
        black_market_goods: [],
      };

      const relationship = relationships.find(
        (r) => r.merchant_id === merchantId
      );
      const relScore = relationship?.score ?? 0;

      for (const type in grouped) {
        // Filter inventory rows BEFORE selecting IDs
        const filteredRows = invRows.filter((row) => {
          if (type === "black_market_goods" && relScore < 8) return false;
          return row.item_type === type;
        });

        const ids = filteredRows.map((row) => row.item_id);

        if (ids.length > 0) {
          const { data: items, error: itemErr } = await supabase
            .from(type)
            .select("*")
            .in("id", ids);

          if (itemErr) {
            console.error(`Error loading ${type}:`, itemErr);
          } else {
            grouped[type] = items;
          }
        }
      }

      setInventory({
        ...grouped,
        quantityMap,
      });
      setLoading(false);
    };

    fetchInventory();
  }, [merchantId, relationships]);

  const handleItemClick = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
  };
  const closeModal = () => {
    if (finalPrice) {
      setConfirmClose(true); // Show the confirmation warning
    } else {
      // Safe to close immediately
      resetModal();
    }
  };

  const resetModal = () => {
    setSelectedItem(null);
    setSelectedType(null);
    setFinalPrice(null);
    setDiscountPercent(0);
    setHaggleMessage("");
    setConfirmClose(false);
  };

  const handleBuyNow = async () => {
    const item = selectedItem;
    const itemType = selectedType;
    const itemQuantity = inventory.quantityMap[item.id] ?? 0;
    const priceToPay = finalPrice ?? selectedItem.cost;

    if (!character || !item || itemQuantity <= 0) return;

    if (character.gold < item.cost) {
      alert("Not enough gold!");
      return;
    }

    // 1. Deduct gold from character
    const { error: charErr } = await supabase
      .from("Characters")
      .update({ gold: character.gold - priceToPay })

      .eq("id", character.id);

    if (charErr) return alert("Failed to update character gold.");

    // 2. Fetch and update merchant
    const { data: merchantData, error: merchErr } = await supabase
      .from("Merchant")
      .select("*")
      .eq("id", merchantId)
      .single();

    if (merchErr || !merchantData) return alert("Failed to find merchant.");

    const { error: updateMerchErr } = await supabase
      .from("Merchant")
      .update({ gold: merchantData.gold + priceToPay })

      .eq("id", merchantId);

    if (updateMerchErr) return alert("Failed to update merchant gold.");

    // 3. Update merchant_inventory
    const { data: invRow } = await supabase
      .from("merchant_inventory")
      .select("*")
      .eq("merchant_id", merchantId)
      .eq("item_type", itemType)
      .eq("item_id", item.id)
      .single();

    if (invRow?.quantity === 1) {
      await supabase.from("merchant_inventory").delete().eq("id", invRow.id);
    } else {
      await supabase
        .from("merchant_inventory")
        .update({ quantity: invRow.quantity - 1 })
        .eq("id", invRow.id);
    }

    // 4. Add to or update character_inventory
    const { data: existingEntry } = await supabase
      .from("character_inventory")
      .select("*")
      .eq("character_id", character.id)
      .eq("item_type", itemType)
      .eq("item_id", item.id)
      .single();

    if (existingEntry) {
      await supabase
        .from("character_inventory")
        .update({ quantity: existingEntry.quantity + 1 })
        .eq("id", existingEntry.id);
    } else {
      await supabase.from("character_inventory").insert({
        character_id: character.id,
        item_type: itemType,
        item_id: item.id,
        quantity: 1,
        attuned: false,
        equipped: false,
      });
    }

    alert("Purchase complete!");
    setSelectedItem(null);
    // Update local inventory
    setInventory((prev) => {
      const updated = {
        ...prev,
        quantityMap: { ...prev.quantityMap }, // ← important
      };

      const currentQty = updated.quantityMap[item.id] ?? 1;

      if (currentQty > 1) {
        updated.quantityMap[item.id] = currentQty - 1;
      } else {
        delete updated.quantityMap[item.id];
        updated[itemType] = updated[itemType].filter((i) => i.id !== item.id);
      }

      return updated;
    });

    // Optionally: refresh inventory data
  };
  const handleHaggle = async () => {
    const item = selectedItem;
    const itemType = selectedType;
    if (!character || !item || discountPercent === 0) return;

    // Already tried haggling check
    const { data: previous } = await supabase
      .from("haggle_attempts")
      .select("*")
      .eq("character_id", character.id)
      .eq("merchant_id", merchantId)
      .eq("item_type", itemType)
      .eq("item_id", item.id)
      .single();

    if (previous) {
      setHaggleMessage("You've already tried haggling for this item.");
      return;
    }

    setHaggleLoading(true);
    setHaggleMessage(""); // Clear old result

    setTimeout(async () => {
      // Roll logic
      let requiredRoll =
        discountPercent === 10 ? 10 : discountPercent === 20 ? 15 : 20;

      const relationship = relationships.find(
        (r) => r.merchant_id === merchantId
      );
      const relScore = relationship?.score ?? 5;

      if (relScore <= 3) requiredRoll += 5;
      else if (relScore === 8) requiredRoll -= 2;
      else if (relScore === 9) requiredRoll -= 4;
      else if (relScore === 10) requiredRoll -= 6;

      const d20 = Math.floor(Math.random() * 20) + 1;
      const totalRoll = d20 + (character.char || 0);

      await supabase.from("haggle_attempts").insert({
        character_id: character.id,
        merchant_id: merchantId,
        item_type: itemType,
        item_id: item.id,
        discount_requested: discountPercent,
        roll_result: d20,
        success: totalRoll >= requiredRoll,
      });

      if (totalRoll >= requiredRoll) {
        const discountAmount = Math.floor((item.cost * discountPercent) / 100);
        const discountedCost = item.cost - discountAmount;
        setFinalPrice(discountedCost);
        setHaggleMessage(
          `Success! Rolled ${d20} + ${
            character.char ?? 0
          } Your Bonus = ${totalRoll} Total Roll. New price: ${discountedCost} gp.`
        );
      } else {
        setHaggleMessage(
          `Failed! Rolled ${d20} + ${
            character.char ?? 0
          } Your Bonus = ${totalRoll} Total Roll. No discount.`
        );
      }

      setHaggleLoading(false);
    }, 2000);
  };

  if (loading) return <div>Loading merchant inventory...</div>;

  return (
    <div className="merchant-inventory">
      {Object.entries(inventory).map(
        ([key, items]) =>
          items.length > 0 && (
            <div key={key} className="inventory-section">
              <h3>{ITEM_TYPES[key]}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Weight</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleItemClick(item, key)}
                    >
                      <td>{item.name}</td>
                      <td>{item.cost ?? "—"} gp</td>
                      <td>{item.weight}</td>
                      <td>{inventory.quantityMap[item.id] ?? 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}

      {selectedItem && (
        <div className="item-modal-overlay" onClick={closeModal}>
          <div className="item-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedItem.name}</h3>
            <p>
              <strong>Type:</strong> {ITEM_TYPES[selectedType]}
            </p>
            <p>
              <p>
                <strong>Cost:</strong> {finalPrice ?? selectedItem.cost ?? "—"}{" "}
                gp
              </p>
            </p>
            <p>
              <strong>Weight:</strong> {selectedItem.weight}
            </p>
            <p>
              <strong>Rarity:</strong> {selectedItem.rarity}
            </p>
            {selectedItem.attunement !== undefined && (
              <p>
                <strong>Attunement:</strong>{" "}
                {selectedItem.attunement ? "Yes" : "No"}
              </p>
            )}
            {selectedItem.legal !== undefined && (
              <p>
                <strong>Illegal:</strong> {selectedItem.legal ? "Yes" : "No"}
              </p>
            )}
            <p>
              <strong>Description:</strong>
            </p>
            <p>{selectedItem.description || "No description available."}</p>
            <button onClick={closeModal}>Close</button>
            <div className="haggle-section">
              <p>
                <strong>Try to Haggle: </strong>
                10% = DC10, 20% = DC15, 30% = DC20<br></br> You got one shot to
                haggle per item.
              </p>
              <select
                value={discountPercent}
                onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
              >
                <option value={0}>No Discount</option>
                <option value={10}>10% Off</option>
                <option value={20}>20% Off</option>
                <option value={30}>30% Off</option>
              </select>
              <button onClick={handleHaggle}>Haggle</button>
              {haggleLoading ? (
                <div className="haggle-roll-animation">
                  <img
                    src={GIF}
                    alt="Rolling d20..."
                    style={{ width: "64px" }}
                  />
                  <p>Rolling the dice...</p>
                </div>
              ) : (
                haggleMessage && <p>{haggleMessage}</p>
              )}
            </div>

            <button onClick={handleBuyNow}>Buy Now</button>
            {confirmClose && (
              <div className="confirm-close-warning">
                <p>
                  ⚠️ You’ve successfully haggled! If you leave now, the
                  discounted price will be lost and you’ll have to pay full
                  price later. Are you sure?
                </p>
                <div className="merchant-actions">
                  <button
                    className="merchant-action-button"
                    onClick={() => setConfirmClose(false)}
                  >
                    Go Back
                  </button>
                  <button
                    className="merchant-action-button"
                    onClick={resetModal}
                    style={{ backgroundColor: "#a00" }}
                  >
                    Yeah, I’m sure. Forget it.
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
