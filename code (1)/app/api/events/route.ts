 import { NextResponse } from "next/server"
import { db } from "@/lib/firebaseConfig"
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore"

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ events: [], error: "Firebase not configured (db is null)" }, { status: 500 })
    }
    const snap = await getDocs(collection(db, "events"))
    const events = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return NextResponse.json({ events }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ events: [], error: err?.message || "Failed to load events" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: "Firebase not configured (db is null)" }, { status: 500 })
    }
    const body = await req.json().catch(() => ({}))
    const payload = { ...body, createdAt: serverTimestamp() }
    const ref = await addDoc(collection(db, "events"), payload)
    return NextResponse.json({ event: { id: ref.id, ...body } }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to create" }, { status: 500 })
  }
}
