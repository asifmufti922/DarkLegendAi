export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ output: "❌ Sawal likho na baby 😅" });
  }

  try {
    const r = await fetch(`https://bj-tricks-assistant.bj-dev-x.workers.dev/?text=${encodeURIComponent(q)}`);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ output: "❌ API error: " + e.message });
  }
}
