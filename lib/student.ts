import { prisma } from './prisma'

export async function getStudentProfile(userId: string) {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { user: true },
  })
  if (!profile) {
    throw new Error('Profile not found')
  }
  return profile
}

export async function updateStudentProfile(userId: string, data: {
  firstName?: string
  lastName?: string
  bio?: string
  gpa?: number
  major?: string
}) {
  const profile = await prisma.profile.update({
    where: { userId },
    data,
  })
  return profile
}

export async function getStudentCourses(userId: string) {
  const enrollments = await prisma.courseEnrollment.findMany({
    where: { userId },
    include: { course: true },
  })
  return enrollments.map(enrollment => ({
    ...enrollment.course,
    grade: enrollment.grade,
  }))
}

