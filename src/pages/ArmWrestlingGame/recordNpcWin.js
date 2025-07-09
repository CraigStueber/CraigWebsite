import supabase from "../../client";

async function recordNpcWin(userId, npcName, didPlayerWin) {
  const winValue = didPlayerWin ? 1 : 0;

  const { error: insertError } = await supabase.from("NpcWins").insert([
    {
      user_id: userId,
      npc_name: npcName,
      wins: winValue,
      last_win: new Date().toISOString(),
    },
  ]);

  if (insertError) {
    console.error("Failed to insert match result:", insertError);
  }
}

export default recordNpcWin;
