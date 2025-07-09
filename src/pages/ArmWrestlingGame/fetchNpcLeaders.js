import supabase from "../../client";

export async function fetchNpcLeaders() {
  // Get all win records (wins = 1)
  const { data, error } = await supabase
    .from("NpcWins")
    .select("npc_name, user_id")
    .eq("wins", 1);

  if (error) {
    console.error("Error fetching win data:", error);
    return [];
  }

  // Aggregate wins by npc_name + user_id
  const scores = {};
  for (const { npc_name, user_id } of data) {
    const key = `${npc_name}:${user_id}`;
    scores[key] = (scores[key] || 0) + 1;
  }

  // Determine leader per NPC
  const leaderMap = {};
  for (const key in scores) {
    const [npc_name, user_id] = key.split(":");
    const wins = scores[key];
    if (!leaderMap[npc_name] || wins > leaderMap[npc_name].wins) {
      leaderMap[npc_name] = { user_id, wins };
    }
  }

  const userIds = Object.values(leaderMap).map((l) => l.user_id);
  const { data: characters, error: charError } = await supabase
    .from("Characters")
    .select("userId, name")
    .in("userId", userIds);

  if (charError) {
    console.error("Error fetching character names:", charError);
    return [];
  }

  const idToName = Object.fromEntries(
    characters.map((char) => [char.userId, char.name])
  );

  // Final leaderboard array
  return Object.entries(leaderMap).map(([npc_name, { user_id, wins }]) => ({
    npc_name,
    user: idToName[user_id] || "Unknown",
    wins,
  }));
}
