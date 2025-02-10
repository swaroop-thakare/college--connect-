import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// In-memory user store (replace with a database in production)
let users: { id: string; username: string; email: string; password: string; role: string }[] = []

export async function signUp(username: string, email: string, password: string, role: 'student' | 'teacher' | 'admin') {
  const hashedPassword = await hash(password, 10)
  const id = Date.now().toString()
  const user = { id, username, email, password: hashedPassword, role }
  users.push(user)
  return { id: user.id, username: user.username, email: user.email, role: user.role }
}

export async function signIn(username: string, password: string) {
  const user = users.find(u => u.username === username)
  if (!user) {
    throw new Error('User not found')
  }
  const isValid = await compare(password, user.password)
  if (!isValid) {
    throw new Error('Invalid password')
  }
  const token = sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })
  return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } }
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { userId: string; role: string }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export async function verifyMFA(username: string, code: string) {
  // In a real application, you would verify the MFA code here
  // For this example, we'll just check if the code is '123456'
  if (code !== '123456') {
    throw new Error('Invalid MFA code')
  }
  const user = users.find(u => u.username === username)
  if (!user) {
    throw new Error('User not found')
  }
  const token = sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' })
  return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } }
}

