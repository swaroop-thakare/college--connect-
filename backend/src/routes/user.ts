import { Router } from "express"
import { prisma } from "../server"
import { auth } from "../middleware/auth"

const router = Router()

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: { profile: true },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.put("/profile", auth, async (req, res) => {
  try {
    const { bio, gpa, major } = req.body

    const updatedProfile = await prisma.profile.upsert({
      where: { userId: req.user?.id },
      update: { bio, gpa, major },
      create: { userId: req.user?.id, bio, gpa, major },
    })

    res.json(updatedProfile)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

export default router

