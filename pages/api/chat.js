import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { question } = req.body;
  if(!question) return res.status(400).json({ reply: 'Acha likho yaar 😅' });

  try{
    const msg = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages:[
        { role:'system', content:'Roman Urdu funny romantic female assistant tone.' },
        { role:'user', content: question }
      ]
    });
    let reply = msg.choices?.[0]?.message?.content || 'Sorry samajh nahi aaya 😢';
    res.status(200).json({ reply });
  }catch(e){
    res.status(500).json({ reply: 'Error: '+e.message });
  }
}
