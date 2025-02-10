import { Router } from "express"
import { prisma } from "../server"
import { auth } from "../middleware/auth"

const router = Router()

router.post("/", auth, async (req, res) => {
  try {
    const { content, receiverId } = req.body
    const message = await prisma.message.create({
      data: {
        content,
        senderId: req.user?.id,
        receiverId,
      },
    })

    res.json(message)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

router.get("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user?.id, receiverId: userId },
          { senderId: userId, receiverId: req.user?.id },
        ],
      },
      orderBy: { createdAt: "asc" },
    })

    res.json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" })
  }
})

export default router

