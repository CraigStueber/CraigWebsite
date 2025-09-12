// src/components/MegansList/MegansList.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import Megan from "./Megan";
function MegansList() {
  const { userId, loading } = useSession();
  const navigate = useNavigate();

  // Hard-coded IDs
  const MEGAN_ID = "79a7d7cf-daeb-4b22-a28d-83f6faf59b71";
  const CRAIG_ID = "e797bcbc-3af7-445b-bd7b-a618a75af543";

  useEffect(() => {
    if (!loading) {
      if (!userId) {
        // Not logged in at all → send to login with redirect back to /meganslist
        navigate("/login", {
          state: { redirectTo: "/meganslist" },
          replace: true,
        });
      }
    }
  }, [userId, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!userId) return null; // navigation will handle it

  if (userId === MEGAN_ID || userId === CRAIG_ID) {
    return <Megan />;
  }

  return <div>YOU ARE NOT MEGAN</div>;
}

export default MegansList;
