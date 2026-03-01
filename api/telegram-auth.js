import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id, first_name, username } = req.query;

  if (!id) {
    return res.status(400).send("No Telegram ID");
  }

  const SUPABASE_URL = "https://xitwqyasjsaptwmbqnrd.supabase.co"; // вставь свой URL
  const SUPABASE_KEY = "sb_secret_d3Guu5WQSYk5oFEcLOd9Tg_8wzewt9q"; // твой secret key

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        telegram_id: id,
        username,
        first_name
      })
    });

    res.redirect("/"); // редирект после логина
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}
