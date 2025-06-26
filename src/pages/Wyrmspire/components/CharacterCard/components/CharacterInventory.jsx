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
                quantity: invEntry?.quantity ?? 1,
                equipped: invEntry?.equipped ?? false,
                attuned: invEntry?.attuned ?? false,
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
                    <th>Weight</th>
                    <th>Equipped</th>
                    <th>Attuned</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
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
    </div>
  );
}

export default CharacterInventory;
