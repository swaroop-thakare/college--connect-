import { NextResponse } from 'next/server'
import { signUp } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json()
    const user = await signUp(username, email, password, role)
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 400 })
  }
}

