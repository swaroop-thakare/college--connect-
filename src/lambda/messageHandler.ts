import type { APIGatewayProxyHandler } from "aws-lambda"
import { DynamoDB } from "aws-sdk"
import { Redis } from "ioredis"
import { v4 as uuidv4 } from "uuid"

const dynamoDB = new DynamoDB.DocumentClient()
const redis = new Redis(process.env.REDIS_URL)

export const sendMessage: APIGatewayProxyHandler = async (event) => {
  try {
    const { senderId, receiverId, content } = JSON.parse(event.body || "{}")

    const messageId = uuidv4()
    const timestamp = new Date().toISOString()

    // Store message in DynamoDB
    await dynamoDB
      .put({
        TableName: "Messages",
        Item: {
          messageId,
          senderId,
          receiverId,
          content,
          timestamp,
        },
      })
      .promise()

    // Publish message to Redis for real-time updates
    await redis.publish(
      "new_message",
      JSON.stringify({
        messageId,
        senderId,
        receiverId,
        content,
        timestamp,
      }),
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ messageId, timestamp }),
    }
  } catch (error) {
    console.error("Error sending message:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send message" }),
    }
  }
}

export const getMessages: APIGatewayProxyHandler = async (event) => {
  try {
    const { userId } = event.pathParameters || {}

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is required" }),
      }
    }

    const result = await dynamoDB
      .query({
        TableName: "Messages",
        IndexName: "UserMessages",
        KeyConditionExpression: "senderId = :userId OR receiverId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      .promise()

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    }
  } catch (error) {
    console.error("Error fetching messages:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch messages" }),
    }
  }
}

