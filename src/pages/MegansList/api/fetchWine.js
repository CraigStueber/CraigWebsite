// src/features/wine/api/fetchWine.js
import supabase from "../../../client";

/**
 * Fetch all wine rows for a given user.
 * Columns expected: id, uuid, created_at, name, description, rating, user
 * If you rename the "user" column to "user_id", update the .eq() accordingly.
 */
export async function fetchWineByUser(userId) {
  if (!userId) throw new Error("fetchWineByUser: userId is required");

  const { data, error } = await supabase
    .from("Wine")
    .select("id, uuid, created_at, name, description, rating, user")
    .eq("user", userId) // change to .eq("user_id", userId) if you rename the column
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Convenience helper: uses current session to fetch wine rows.
 */
export async function fetchWineForCurrentUser() {
  const { data: sessionData, error: sessionErr } =
    await supabase.auth.getSession();
  if (sessionErr) throw new Error(sessionErr.message);

  const uid = sessionData?.session?.user?.id;
  if (!uid) throw new Error("No active session");

  return fetchWineByUser(uid);
}
