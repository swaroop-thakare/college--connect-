import type { APIGatewayProxyHandler } from "aws-lambda"
import { DynamoDB } from "aws-sdk"
import { Redis } from "ioredis"

const dynamoDB = new DynamoDB.DocumentClient()
const redis = new Redis(process.env.REDIS_URL)

export const onConnect: APIGatewayProxyHandler = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId
    const userId = event.queryStringParameters?.userId

    if (!userId) {
      return { statusCode: 400, body: "userId is required" }
    }

    await dynamoDB
      .put({
        TableName: "WebSocketConnections",
        Item: {
          connectionId,
          userId,
          timestamp: new Date().toISOString(),
        },
      })
      .promise()

    await redis.set(`user:${userId}:connection`, connectionId)

    return { statusCode: 200, body: "Connected" }
  } catch (error) {
    console.error("WebSocket connect error:", error)
    return { statusCode: 500, body: "Failed to connect" }
  }
}

export const onDisconnect: APIGatewayProxyHandler = async (event) => {
  try {
    const connectionId = event.requestContext.connectionId

    const connection = await dynamoDB
      .get({
        TableName: "WebSocketConnections",
        Key: { connectionId },
      })
      .promise()

    if (connection.Item) {
      const userId = connection.Item.userId
      await redis.del(`user:${userId}:connection`)
    }

    await dynamoDB
      .delete({
        TableName: "WebSocketConnections",
        Key: { connectionId },
      })
      .promise()

    return { statusCode: 200, body: "Disconnected" }
  } catch (error) {
    console.error("WebSocket disconnect error:", error)
    return { statusCode: 500, body: "Failed to disconnect" }
  }
}

