import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'

async function main() {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    console.error('Missing GOOGLE_API_KEY in environment')
    process.exit(1)
  }

  const ai = new GoogleGenAI({ apiKey })
  const prompt = 'Say hello in one short sentence.'
  console.log('Testing Gemini with prompt:', prompt)
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
    })
    console.log('Response text:', response.text)
  } catch (err) {
    console.error('Gemini error:', err)
    process.exit(1)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

