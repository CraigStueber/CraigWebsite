import { useEffect, useState } from "react";
import { useCharacter } from "../../../../../context/CharacterContext";
import supabase from "../../../../../client";
import "./CharacterInventory.styles.css";

const ITEM_TYPES = {
  equipment: "Equipment",
  raw_goods: "Raw Goods",
  magic_items: "Magic Items",
  black_market_goods: "Black Market",
};

function CharacterInventory() {
  const { character, loading } = useCharacter();
  const [inventory, setInventory] = useState({});
  const [invLoading, setInvLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSellModal, setShowSellModal] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchantId, setSelectedMerchantId] = useState("");
  const [selectedMerchantScore, setSelectedMerchantScore] = useState(0);

  const handleMerchantChange = (e) => {
    const merchId = e.target.value;
    setSelectedMerchantId(merchId);
    const match = merchants.find((m) => m.id === parseInt(merchId));
    setSelectedMerchantScore(match?.Score ?? 0);
  };

  const handleSellItem = async () => {
    if (!selectedItem || !selectedMerchantId) return;

    const sellPrice = calculateSellPrice(
      selectedItem.price,
      selectedMerchantScore
    );

    // 1. Fetch latest character + merchant gold
    const { data: merchantData, error: merchErr } = await supabase
      .from("Merchant")
      .select("gold")
      .eq("id", selectedMerchantId)
      .single();

    const { data: characterData, error: charFetchErr } = await supabase
      .from("Characters")
      .select("gold")
      .eq("id", character.id)
      .single();

    if (merchErr || charFetchErr) {
      console.error(
        "Failed to fetch character or merchant gold:",
        merchErr || charFetchErr
      );
      return;
    }

    const merchantGold = merchantData?.gold ?? 0;
    const characterGold = characterData?.gold ?? 0;

    if (merchantGold < sellPrice) {
      alert("That merchant cannot afford this item.");
      return;
    }

    // 2. Proceed with transaction
    const { data: invRow, error: fetchInvErr } = await supabase
      .from("character_inventory")
      .select("id, quantity")
      .eq("character_id", character.id)
      .eq("item_id", selectedItem.id)
      .maybeSingle();

    if (fetchInvErr || !invRow) {
      console.error("Failed to fetch inventory row:", fetchInvErr);
      return;
    }

    if (invRow.quantity > 1) {
      const { error: updateQtyErr } = await supabase
        .from("character_inventory")
        .update({ quantity: invRow.quantity - 1 })
        .eq("id", invRow.id);

      if (updateQtyErr) {
        console.error("Failed to decrement inventory quantity:", updateQtyErr);
        return;
      }
    } else {
      const { error: deleteErr } = await supabase
        .from("character_inventory")
        .delete()
        .eq("id", invRow.id);

      if (deleteErr) {
        console.error("Failed to delete inventory row:", deleteErr);
        return;
      }
    }

    const { error: charUpdateErr } = await supabase
      .from("Characters")
      .update({ gold: characterGold + sellPrice })
      .eq("id", character.id);

    const { error: merchUpdateErr } = await supabase
      .from("Merchant")
      .update({ gold: merchantGold - sellPrice })
      .eq("id", selectedMerchantId);

    if (charUpdateErr || merchUpdateErr) {
      console.error("Sell operation failed", {
        charUpdateErr,
        merchUpdateErr,
      });
      return;
    }

    // 3. Optional relationship bump
    if (Math.random() < 0.25) {
      const { data: existingRel, error: relErr } = await supabase
        .from("MerchRelationship")
        .select("id, Score")
        .eq("PC", character.id)
        .eq("Merch", selectedMerchantId)
        .maybeSingle();

      if (relErr && relErr.code !== "PGRST116") {
        console.error("Relationship fetch failed:", relErr);
      } else if (existingRel) {
        if (existingRel.Score < 10) {
          const newScore = Math.min(existingRel.Score + 1, 10);

          const { error: updateErr } = await supabase
            .from("MerchRelationship")
            .update({ Score: newScore })
            .eq("id", existingRel.id);

          if (updateErr) {
            console.error(
              "Failed to update capped relationship score:",
              updateErr
            );
          }
        }
      } else {
        // Insert new relationship, starting at capped max of 5 (or 10 if you want)
        const { error: insertErr } = await supabase
          .from("MerchRelationship")
          .insert({
            PC: character.id,
            Merch: selectedMerchantId,
            Score: 5,
          });

        if (insertErr) {
          console.error("Failed to insert new relationship:", insertErr);
        }
      }
    }

    // 4. Track item in merchant inventory
    const { data: existingItem, error: findError } = await supabase
      .from("merchant_inventory")
      .select("id, quantity")
      .eq("merchant_id", selectedMerchantId)
      .eq("item_id", selectedItem.id)
      .eq("item_type", selectedItem.item_type)
      .maybeSingle();

    if (findError && findError.code !== "PGRST116") {
      console.error("Merchant inventory lookup failed:", findError);
    } else if (existingItem) {
      // Increment existing item quantity
      const { error: updateErr } = await supabase
        .from("merchant_inventory")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (updateErr) {
        console.error("Failed to update merchant inventory:", updateErr);
      }
    } else {
      // Insert new row into merchant inventory
      const { error: insertErr } = await supabase
        .from("merchant_inventory")
        .insert({
          merchant_id: selectedMerchantId,
          item_id: selectedItem.id,
          item_type: selectedItem.item_type,
          quantity: 1,
          is_hidden: false,
        });

      if (insertErr) {
        console.error("Failed to insert merchant inventory item:", insertErr);
      }
    }

    // 5. UI Feedback and Cleanup
    alert(`${selectedItem.name} sold for ${sellPrice} gold!`);

    setInventory((prev) => {
      const newInv = { ...prev };
      for (let group of Object.keys(newInv)) {
        newInv[group] = newInv[group]
          .map((i) => {
            if (i.id === selectedItem.id) {
              if (i.quantity > 1) {
                return { ...i, quantity: i.quantity - 1 };
              }
              return null;
            }
            return i;
          })
          .filter(Boolean);
      }
      return newInv;
    });

    // Now close modal and clear selection
    setShowSellModal(false);
    setSelectedItem(null);
    setSelectedMerchantId("");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowSellModal(true);
  };

  useEffect(() => {
    if (!character || loading) return;

    const fetchInventory = async () => {
      setInvLoading(true);

      const { data: invRows, error } = await supabase
        .from("character_inventory")
        .select("*")
        .eq("character_id", character.id);

      if (error) {
        console.error("Failed to fetch inventory:", error);
        return;
      }
      const { data: merchantList, error: merchantError } = await supabase
        .from("Merchant")
        .select("id, name");

      if (!merchantError && merchantList) {
        // Fetch relationship scores
        const { data: rels, error: relErr } = await supabase
          .from("MerchRelationship")
          .select("PC, Merch, Score")
          .eq("PC", character.id);

        if (relErr) {
          console.error("Failed to fetch merchant relationships:", relErr);
          setMerchants(merchantList.map((m) => ({ ...m, Score: null })));
        } else {
          // Merge scores into merchants
          const merchantWithScores = merchantList.map((m) => {
            const match = rels.find((r) => r.Merch === m.id);
            return { ...m, Score: match?.Score ?? 0 };
          });
          setMerchants(merchantWithScores);
        }
      }

      const grouped = {
        equipment: [],
        raw_goods: [],
        magic_items: [],
        black_market_goods: [],
      };

      for (const type of Object.keys(grouped)) {
        const ids = invRows
          .filter((row) => row.item_type === type)
          .map((row) => row.item_id);

        if (ids.length > 0) {
          const { data: items, error: itemErr } = await supabase
            .from(type)
            .select("*")
            .in("id", ids);

          if (!itemErr && items) {
            grouped[type] = items.map((item) => {
              const invEntry = invRows.find((i) => i.item_id === item.id);
              return {
                ...item,
                price: item.cost ?? 0,
                quantity: invEntry?.quantity ?? 1,
                equipped: invEntry?.equipped ?? false,
                attuned: invEntry?.attuned ?? false,
                item_type: invEntry?.item_type ?? "",
              };
            });
          }
        }
      }

      setInventory(grouped);
      setInvLoading(false);
    };

    fetchInventory();
  }, [character, loading]);

  if (invLoading)
    return <div className="character-inventory">Loading inventory...</div>;
  const calculateSellPrice = (basePrice, trustScore) => {
    if (trustScore >= 8) return Math.floor(basePrice * 0.85);
    if (trustScore >= 4) return Math.floor(basePrice * 0.75);
    return Math.floor(basePrice * 0.6);
  };

  return (
    <div className="character-inventory">
      <h3>Inventory</h3>
      {Object.entries(inventory).map(
        ([type, items]) =>
          items.length > 0 && (
            <div key={type} className="inventory-group">
              <h4>{ITEM_TYPES[type]}</h4>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>W</th>
                    <th>Equ</th>
                    <th>Att</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="clickable-row"
                    >
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.weight}</td>
                      <td>{item.equipped ? "✓" : ""}</td>
                      <td>{item.attuned ? "✓" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
      )}
      {showSellModal && selectedItem && (
        <div className="merchant-popup-overlay">
          <div className="merchant-popup">
            <h3>Sell {selectedItem.name}</h3>
            <p>Base Price: {selectedItem.price}</p>
            <p>
              Sell Price:{" "}
              {selectedMerchantId
                ? calculateSellPrice(selectedItem.price, selectedMerchantScore)
                : "--"}
            </p>

            <label>Choose Merchant:</label>
            <select value={selectedMerchantId} onChange={handleMerchantChange}>
              <option value="">-- Select Merchant --</option>
              {merchants.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.Score != null ? `(Trust: ${m.Score})` : ""}
                </option>
              ))}
            </select>

            <div className="merchant-actions">
              <button
                className="merchant-action-button"
                onClick={handleSellItem}
                disabled={!selectedMerchantId}
              >
                Confirm Sale
              </button>
              <button onClick={() => setShowSellModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterInventory;
