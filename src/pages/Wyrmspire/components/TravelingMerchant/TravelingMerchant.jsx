import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../client";
import { useCharacter } from "../../../../context/CharacterContext";
import TalkToMerchantModal from "./components/TalkToMerchant/TalkToMerchantModal";
import MerchantCard from "./components/MerchantCard/MerchantCard";
import Inventory from "./components/Inventory/Inventory";
import "./TravelingMerchant.styles.css";

function TravelingMerchant() {
  const [user, setUser] = useState(null);
  const [showBuyHelp, setShowBuyHelp] = useState(false);
  const [showSellHelp, setShowSellHelp] = useState(false);
  const [showTalk, setShowTalk] = useState(false);

  const { character, relationships, loading } = useCharacter();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/login"); // 👈 now using /login
      } else {
        setUser(session.user);
      }
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          navigate("/login"); // 👈 and here too
        } else {
          setUser(session.user);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  if (!user) return null;
  if (!character) return <div>No character found for user.</div>;
  return (
    <div className="traveling-merchant">
      <div className="merchant-header">
        <h2>Traveling Merchant</h2>

        <div className="merchant-actions">
          <button
            onClick={() => setShowTalk(true)}
            className="merchant-action-button"
          >
            Talk to Merchant
          </button>

          <button
            onClick={() => setShowSellHelp(true)}
            className="merchant-action-button"
          >
            Sell Stuff to Merchant
          </button>

          <button
            onClick={() => setShowBuyHelp(true)}
            className="merchant-action-button"
          >
            Buy Stuff from Merchant
          </button>
        </div>
      </div>
      <div className="merchant-layout">
        <MerchantCard merchantId={1} />
        <Inventory merchantId={1} />
      </div>
      {showBuyHelp && (
        <div
          className="merchant-popup-overlay"
          onClick={() => setShowBuyHelp(false)}
        >
          <div className="merchant-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Buying from Merchants</h3>
            <p>
              To buy from a merchant, all you have to do is click on the item
              you want and then choose <strong>Buy Now</strong> or{" "}
              <strong>Negotiate</strong>.
            </p>
            <button onClick={() => setShowBuyHelp(false)}>Close</button>
          </div>
        </div>
      )}
      {showSellHelp && (
        <div
          className="merchant-popup-overlay"
          onClick={() => setShowSellHelp(false)}
        >
          <div className="merchant-popup" onClick={(e) => e.stopPropagation()}>
            <h3>How to Sell</h3>
            <p>
              Go to your character and simply click on an item — I’m sure your{" "}
              <strong>Intelligence</strong> is high enough to figure out the
              rest.
              <br />
              <br />
              If not... well, there’s nothing I can do for you.
            </p>
            <button onClick={() => setShowSellHelp(false)}>Close</button>
          </div>
        </div>
      )}
      {showTalk && (
        <TalkToMerchantModal
          merchantId={1}
          merchantName="Gruk"
          onClose={() => setShowTalk(false)}
        />
      )}
    </div>
  );
}

export default TravelingMerchant;
