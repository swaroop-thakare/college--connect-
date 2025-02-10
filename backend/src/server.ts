import express, { type Express } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"
import courseRoutes from "./routes/course"
import messageRoutes from "./routes/message"

dotenv.config()

const app: Express = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/messages", messageRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export { prisma }

