import { NextResponse } from 'next/server'
import { verifyMFA } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, code } = await req.json()
    const result = await verifyMFA(username, code)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid MFA code' }, { status: 401 })
  }
}

