import { prisma } from './prisma'

export async function sendMessage(senderId: string, receiverId: string, content: string) {
  return prisma.message.create({
    data: { senderId, receiverId, content },
  })
}

export async function getMessages(userId: string) {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId },
      ],
    },
    include: { sender: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getChats(userId: string) {
  const chats = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      sentMessages: {
        select: {
          receiver: true,
        },
        distinct: ['receiverId'],
      },
      receivedMessages: {
        select: {
          sender: true,
        },
        distinct: ['senderId'],
      },
    },
  })

  if (!chats) {
    throw new Error('User not found')
  }

  const uniqueChats = new Set([
    ...chats.sentMessages.map(m => m.receiver),
    ...chats.receivedMessages.map(m => m.sender),
  ])

  return Array.from(uniqueChats)
}

