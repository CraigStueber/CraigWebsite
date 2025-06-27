import { useEffect, useState } from "react";
import supabase from "../../../../../../client.js";
import { useCharacter } from "../../../../../../context/CharacterContext.jsx";
import "./TalkToMerchantModal.styles.css";

function TalkToMerchantModal({ merchantId, merchantName, onClose }) {
  const { character } = useCharacter();
  const [dialogue, setDialogue] = useState(null);
  const [choiceMade, setChoiceMade] = useState(null);
  const [followup, setFollowup] = useState("");
  const [rumor, setRumor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDialogue = async () => {
      setLoading(true);
      const { data: seen } = await supabase
        .from("merchant_dialogue_history")
        .select("dialogue_id")
        .eq("character_id", character.id)
        .eq("merchant_id", merchantId);

      const seenIds = seen?.map((r) => r.dialogue_id) ?? [];

      const { data: available } = await supabase
        .from("merchant_dialogue")
        .select("*")
        .eq("merchant_id", merchantId)
        .not("id", "in", `(${seenIds.join(",")})`)
        .order("sort_order");

      setDialogue(available?.[0] ?? null);
      setLoading(false);
    };

    fetchDialogue();
  }, [character.id, merchantId]);

  const handleChoice = async (option) => {
    const isA = option === "A";
    setChoiceMade(option);
    setFollowup(isA ? dialogue.followup_a : dialogue.followup_b);
    if (isA ? dialogue.rumor : "") setRumor(dialogue.rumor);

    // Save choice
    await supabase.from("merchant_dialogue_history").insert({
      character_id: character.id,
      merchant_id: merchantId,
      dialogue_id: dialogue.id,
      choice: option,
    });

    const delta = isA
      ? dialogue.relationship_change_a
      : dialogue.relationship_change_b;
    if (delta !== 0) {
      const { data: existing } = await supabase
        .from("MerchRelationship")
        .select("Score")
        .eq("PC", character.id)
        .eq("Merch", merchantId)
        .single();

      if (existing) {
        await supabase
          .from("MerchRelationship")
          .update({ Score: Math.min(existing.Score + delta, 10) })
          .eq("PC", character.id)
          .eq("Merch", merchantId);
      } else {
        await supabase.from("MerchRelationship").insert({
          PC: character.id,
          Merch: merchantId,
          Score: Math.max(1, 5 + delta),
        });
      }
    }
  };

  return (
    <div className="merchant-popup-overlay" onClick={onClose}>
      <div className="merchant-popup" onClick={(e) => e.stopPropagation()}>
        <h3>{merchantName} leans in...</h3>
        {loading ? (
          <p>Loading conversation...</p>
        ) : dialogue ? (
          <>
            <p>
              <strong>{dialogue.prompt}</strong>
            </p>
            {!choiceMade ? (
              <div className="merchant-actions">
                <button onClick={() => handleChoice("A")}>
                  {dialogue.option_a}
                </button>
                <button onClick={() => handleChoice("B")}>
                  {dialogue.option_b}
                </button>
              </div>
            ) : (
              <>
                <p>
                  <em>{followup}</em>
                </p>
                {rumor && (
                  <p>
                    <strong>Rumor Unlocked:</strong> {rumor}
                  </p>
                )}
                <button onClick={onClose}>Close</button>
              </>
            )}
          </>
        ) : (
          <>
            <p>{merchantName} has nothing more to say right now.</p>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TalkToMerchantModal;
