import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../client"; // Adjust the import path as necessary

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState(null);
  const [relationships, setRelationships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterAndRelationships = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: characterData, error } = await supabase
        .from("Characters")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (error) {
        console.error("Error fetching character:", error);
        setLoading(false);
        return;
      }

      setCharacter(characterData);

      const { data: relationshipData, error: relError } = await supabase
        .from("MerchRelationship")
        .select("*")
        .eq("PC", characterData.id);

      if (relError) {
        console.error("Error fetching relationships:", relError);
      } else {
        setRelationships(relationshipData);
      }

      setLoading(false);
    };

    fetchCharacterAndRelationships();
  }, []);

  return (
    <CharacterContext.Provider value={{ character, relationships, loading }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
