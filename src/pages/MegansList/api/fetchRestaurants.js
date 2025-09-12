// src/features/restaurants/api/fetchRestaurants.js
import supabase from "../../../client";

/**
 * Fetch all restaurants for a given user.
 * @param {string} userId - UUID of the user.
 * @returns {Promise<Array>} Array of restaurant rows.
 * @throws Error when Supabase returns an error.
 */
export async function fetchRestaurantsByUser(userId) {
  if (!userId) throw new Error("fetchRestaurantsByUser: userId is required");

  const { data, error } = await supabase
    .from("Restaurants")
    .select(
      "id, uuid, created_at, name, specials, description, user, happyHour"
    )
    .eq("user", userId) // change to .eq("user_id", userId) if you rename column
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/**
 * Convenience helper: pulls current session and fetches that user's restaurants.
 */
export async function fetchRestaurantsForCurrentUser() {
  const { data: sessionData, error: sessionErr } =
    await supabase.auth.getSession();
  if (sessionErr) throw new Error(sessionErr.message);

  const uid = sessionData?.session?.user?.id;
  if (!uid) throw new Error("No active session");

  return fetchRestaurantsByUser(uid);
}
