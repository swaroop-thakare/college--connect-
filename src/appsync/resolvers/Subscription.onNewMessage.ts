export function request(ctx) {
  return {
    payload: { receiverId: ctx.arguments.receiverId },
  }
}

export function response(ctx) {
  return ctx.result
}

