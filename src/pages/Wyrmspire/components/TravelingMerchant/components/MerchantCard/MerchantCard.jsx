import { useEffect, useState } from "react";
import supabase from "../../../../../../client.js";
import "./MerchantCard.styles.css";
import { useCharacter } from "../../../../../../context/CharacterContext.jsx";

function MerchantCard({ merchantId }) {
  const [merchant, setMerchant] = useState(null);
  const { character, relationships, loading } = useCharacter();

  useEffect(() => {
    const fetchMerchant = async () => {
      const { data, error } = await supabase
        .from("Merchant")
        .select("*")
        .eq("id", merchantId)
        .single();

      if (error) {
        console.error("Error loading merchant:", error);
      } else {
        setMerchant(data);
      }
    };

    fetchMerchant();
  }, [merchantId]);

  if (!merchant || loading)
    return <div className="merchant-card">Loading...</div>;

  // Find relationship with this merchant
  const relationship = relationships.find((rel) => rel.Merch === merchantId);

  // Default image index
  let imageVariant = 2;

  if (relationship) {
    const score = relationship.Score;
    if (score >= 1 && score <= 3) imageVariant = 1;
    else if (score >= 4 && score <= 7) imageVariant = 2;
    else if (score >= 8 && score <= 10) imageVariant = 3;
  }

  const imageUrl = `https://ytxcnpaihzholuyjyhqp.supabase.co/storage/v1/object/public/npc/${merchant.img}${imageVariant}.png`;
  console.log(relationship);
  return (
    <div className="merchant-card">
      <img src={imageUrl} alt={merchant.name} className="merchant-img" />
      <h3>{merchant.name}</h3>
      <p>Gold: {merchant.gold} gp</p>
      <p>
        {character.name} your relationship with {merchant.name} is{" "}
        <b>{relationship.Score}</b>
      </p>
    </div>
  );
}

export default MerchantCard;
