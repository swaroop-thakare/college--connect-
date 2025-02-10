import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const result = await signIn(username, password)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

