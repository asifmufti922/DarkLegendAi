import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: '🚫 Only POST allowed' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ reply: '😅 Sawal likhna toh padega baby!' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Tum ek funny, romantic, Roman Urdu bolne wali assistant ho. Tumhara naam Alexa hai aur tum DARK LEGEND ki assistant ho.'
        },
        {
          role: 'user',
          content: question
        }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || '🙈 Alexa kuch bol nahi paayi!';

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('[OpenAI Error]', err);
    return res.status(500).json({ reply: '💥 Server error: ' + err.message });
  }
}
