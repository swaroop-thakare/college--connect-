import { Router } from "express"
import { prisma } from "../server"
import { auth } from "../middleware/auth"

const router = Router()

router.get("/", auth, async (req, res) => {
  try {
    const courses = await prisma.course.findMany()
    res.json(courses)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.post("/", auth, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" })
    }

    const { name, description, instructor, credits } = req.body
    const course = await prisma.course.create({
      data: { name, description, instructor, credits },
    })

    res.json(course)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.post("/enroll", auth, async (req, res) => {
  try {
    const { courseId } = req.body
    const enrollment = await prisma.courseEnrollment.create({
      data: {
        userId: req.user?.id,
        courseId,
      },
    })

    res.json(enrollment)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

export default router

