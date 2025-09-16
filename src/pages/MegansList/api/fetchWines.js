// src/api/fetchWines.js
import supabase from "../../../client";

export async function fetchWinesByUser(userId) {
  const { data, error } = await supabase
    .from("Wine")
    .select(
      "id, created_at, name, description, rating, winery, type, year, region"
    )
    .eq("user", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
