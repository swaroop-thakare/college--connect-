import { prisma } from './prisma'

export async function getAllCourses() {
  return prisma.course.findMany()
}

export async function getCourse(courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { enrollments: { include: { user: true } } },
  })
  if (!course) {
    throw new Error('Course not found')
  }
  return course
}

export async function createCourse(data: {
  name: string
  description: string
  instructor: string
  credits: number
}) {
  return prisma.course.create({ data })
}

export async function enrollStudentInCourse(userId: string, courseId: string) {
  return prisma.courseEnrollment.create({
    data: { userId, courseId },
  })
}

export async function updateGrade(userId: string, courseId: string, grade: number) {
  return prisma.courseEnrollment.update({
    where: { userId_courseId: { userId, courseId } },
    data: { grade },
  })
}

