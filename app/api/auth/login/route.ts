import { NextResponse } from 'next/server'
import { signIn } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    const { token, user } = await signIn(username, password)
    
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

