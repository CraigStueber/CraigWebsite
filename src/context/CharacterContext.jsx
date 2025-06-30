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

  const refreshRelationship = async (merchantId) => {
    if (!character) return;

    const { data, error } = await supabase
      .from("MerchRelationship")
      .select("*")
      .eq("PC", character.id)
      .eq("Merch", merchantId)
      .single();

    if (error) {
      console.error("Failed to refresh relationship:", error);
      return;
    }

    setRelationships((prev) => {
      const exists = prev.find((r) => r.id === data.id);
      return exists
        ? prev.map((r) => (r.id === data.id ? data : r))
        : [...prev, data];
    });
  };

  return (
    <CharacterContext.Provider
      value={{ character, relationships, loading, refreshRelationship }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => useContext(CharacterContext);
