// src/api/fetchBooks.js
import supabase from "../../../client";
export async function fetchBooksByUser(userId) {
  const { data, error } = await supabase
    .from("Books")
    .select("id,created_at, title, author, description, user, owned")
    .eq("user", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
