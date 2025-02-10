import { util } from "@aws-appsync/utils"

export function request(ctx) {
  const { content, receiverId } = ctx.arguments.input
  const senderId = ctx.identity.sub

  return {
    operation: "PutItem",
    key: util.dynamodb.toMapValues({ id: util.autoId() }),
    attributeValues: util.dynamodb.toMapValues({
      content,
      senderId,
      receiverId,
      timestamp: util.time.nowISO8601(),
    }),
  }
}

export function response(ctx) {
  return ctx.result
}

