"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useChat } from "ai/react"

export default function AcademicChatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/academic-chat",
  })

  return (
    <div className="flex flex-col h-[400px]">
      <ScrollArea className="flex-grow mb-4 p-4 border border-gray-700 rounded-md">
        {messages.map((message, i) => (
          <div key={i} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                message.role === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your courses, assignments, or academic policies..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

