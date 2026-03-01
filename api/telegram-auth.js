import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id, first_name, username, hash } = req.query;

  if (!id || !hash) {
    return res.status(400).send("Missing Telegram parameters");
  }

  // --- проверка подписи Telegram (минимальная) ---
  // для MVP можно пропустить и доверять Telegram, но лучше потом добавить полноценную проверку

  // --- вставляем пользователя в Supabase ---
  const SUPABASE_URL = "https://your-supabase-url.supabase.co";
  const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

  const body = {
    telegram_id: id,
    first_name,
    username,
    public_name: first_name
  };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      res.redirect("/"); // редирект на главную после логина
    } else {
      const text = await response.text();
      res.status(500).send("Supabase error: " + text);
    }
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
}
