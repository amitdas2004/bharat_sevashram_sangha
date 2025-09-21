import { NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"
import knowledgeBase from "@/lib/knowledge-base.json"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Missing 'message'" }, { status: 400 })
    }

    const apiKey = 'AIzaSyCm7KDMNE9Ek_OtmtF64N3r8z1jYtGioCw'
    console.log("Using API key:", apiKey.substring(0, 10) + "...")
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: "Google Gemini API key not configured" 
      }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })

    const systemInstruction = `You are a helpful assistant for Bharat Sevashram Sangha – Panjipukur Branch. You have access to comprehensive information about the organization.

IMPORTANT: Use the following knowledge base to answer questions accurately. Always provide specific, factual information based on this data.

KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}

Guidelines:
- Be concise and helpful
- Provide accurate information from the knowledge base
- If asked about account-specific data, reply that you cannot access personal data
- Always mention specific details like phone numbers, email, timings, etc. when relevant
- For admission-related questions, emphasize the eligibility criteria (boys from SC/ST categories only)
- For contact information, always provide the phone number (080170 19305) and email (panjipukurbharatss@gmail.com)
- For office hours, mention that appointments are required before visiting`

    const promptParts: string[] = []
    if (systemInstruction) promptParts.push(systemInstruction)
    if (Array.isArray(history)) {
      for (const turn of history) {
        if (turn && typeof turn.role === "string" && typeof turn.content === "string") {
          promptParts.push(`${turn.role.toUpperCase()}: ${turn.content}`)
        }
      }
    }
    promptParts.push(`USER: ${message}`)

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: promptParts.join("\n\n"),
    })

    return NextResponse.json({ reply: response.text })
  } catch (error: any) {
    console.error("Gemini chat error:", error)
    const message = typeof error?.message === "string" ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


