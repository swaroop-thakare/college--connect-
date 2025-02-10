import { NextResponse } from 'next/server'
import { enrollStudentInCourse } from '@/lib/course'

export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json()
    const enrollment = await enrollStudentInCourse(userId, courseId)
    return NextResponse.json(enrollment)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to enroll in course' }, { status: 500 })
  }
}

