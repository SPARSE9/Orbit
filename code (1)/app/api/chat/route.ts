 import { NextResponse } from "next/server"
 import { GoogleGenerativeAI } from "@google/generative-ai"

 export async function GET() {
   return NextResponse.json({ status: "ok" }, { status: 200 })
 }

 export async function POST(req: Request) {
   try {
     const { message } = await req.json()
     if (!message || typeof message !== "string") {
       return NextResponse.json({ error: "Missing message" }, { status: 400 })
     }

     const apiKey = process.env.GEMINI_API_KEY
     if (!apiKey) {
       return NextResponse.json({ error: "Server missing GEMINI_API_KEY" }, { status: 500 })
     }

     const genAI = new GoogleGenerativeAI(apiKey)
     const model = genAI.getGenerativeModel({ model: "gemini-pro" })
     const result = await model.generateContent(message)
     const text = result.response.text()

     return NextResponse.json({ reply: text }, { status: 200 })
   } catch (err: any) {
     return NextResponse.json({ error: err?.message || "Chat failed" }, { status: 500 })
   }
 }
