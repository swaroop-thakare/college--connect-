"use client"

import { useState, useEffect } from "react"
import { Send, Paperclip, MoreVertical, Search, Phone, Video, ArrowLeft } from "lucide-react"
import { webSocketService } from "@/lib/websocket"
import { useAuth } from "@/contexts/AuthContext"

interface Chat {
  id: number
  name: string
  lastMessage: string
  time: string
  unread?: number
  online?: boolean
  avatar: string
}

interface Message {
  id: number
  chatId: number
  sender: string
  content: string
  timestamp: string
  type: "text" | "file"
  fileInfo?: {
    name: string
    size: string
    type: string
  }
}

const initialChats: Chat[] = [
  {
    id: 1,
    name: "Dr. Smith",
    lastMessage: "Here are the database design resources. Let me know if you have questions.",
    time: "14:43",
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=DrSmith",
  },
  {
    id: 2,
    name: "Web Dev Study Group",
    lastMessage: "Alice: Can someone explain React hooks?",
    time: "13:15",
    unread: 3,
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=WebDevGroup",
  },
  {
    id: 3,
    name: "Prof. Johnson",
    lastMessage: "The cloud computing project deadline has been extended",
    time: "12:30",
    online: true,
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=ProfJohnson",
  },
  {
    id: 4,
    name: "Java Programming TA",
    lastMessage: "Office hours are from 2-4 PM today",
    time: "10:15",
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=JavaTA",
  },
  {
    id: 5,
    name: "Full-Stack Project Team",
    lastMessage: "Meeting at 7 PM to discuss the final presentation",
    time: "09:30",
    unread: 2,
    avatar: "https://api.dicebear.com/6.x/bottts/svg?seed=FullStackTeam",
  },
]

const initialMessages: Message[] = [
  {
    id: 1,
    chatId: 1,
    sender: "Dr. Smith",
    content: "Here are the database design resources. Let me know if you have questions.",
    timestamp: "14:43",
    type: "text",
  },
  {
    id: 2,
    chatId: 1,
    sender: "Dr. Smith",
    content: "database_design_guide.pdf",
    timestamp: "14:44",
    type: "file",
    fileInfo: {
      name: "database_design_guide.pdf",
      size: "2.5 MB",
      type: "PDF Document",
    },
  },
  {
    id: 3,
    chatId: 1,
    sender: "You",
    content: "Thank you, Professor! I'll review it right away.",
    timestamp: "14:45",
    type: "text",
  },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const [chats, setChats] = useState(initialChats)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [newMessage, setNewMessage] = useState("")
  const [isMobileView, setIsMobileView] = useState(false)
  const [showChatList, setShowChatList] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    webSocketService.connect("wss://your-websocket-server-url.com")
    webSocketService.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data])
    })
    return () => {
      webSocketService.off("newMessage", () => {})
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        chatId: selectedChat.id,
        sender: user?.name || "You",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text" as const,
      }
      webSocketService.send("newMessage", message)
      setNewMessage("")
    }
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
    if (isMobileView) {
      setShowChatList(false)
    }
  }

  return (
    <div className="h-screen bg-[#1a1a1a] text-white">
      <div className="flex h-full">
        {/* Chat List Sidebar */}
        {(!isMobileView || showChatList) && (
          <div className="w-full md:w-[400px] border-r border-gray-700">
            {/* Search Header */}
            <div className="p-3 bg-[#2a2a2a]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search or start new chat"
                  className="w-full bg-[#333] text-white py-2 px-4 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Chats List */}
            <div className="overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-[#2a2a2a] ${
                    selectedChat.id === chat.id ? "bg-[#2a2a2a]" : ""
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className="relative">
                    <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-12 h-12 rounded-full" />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-gray-400 ml-2">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && (
                    <div className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Area */}
        {(!isMobileView || !showChatList) && (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-3 bg-[#2a2a2a]">
              {isMobileView && (
                <button onClick={() => setShowChatList(true)} className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}
              <img
                src={selectedChat.avatar || "/placeholder.svg"}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h2 className="font-medium">{selectedChat.name}</h2>
                {selectedChat.online && <p className="text-sm text-gray-400">online</p>}
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white">
                  <Video className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1a1a]">
              {messages
                .filter((message) => message.chatId === selectedChat.id)
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[65%] rounded-lg p-3 ${
                        message.sender === "You" ? "bg-purple-600" : "bg-[#2a2a2a]"
                      }`}
                    >
                      {message.type === "text" ? (
                        <p className="text-white">{message.content}</p>
                      ) : (
                        <div className="flex items-center gap-3 bg-[#333] p-3 rounded">
                          <div className="bg-purple-600 p-2 rounded">
                            <Paperclip className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">{message.fileInfo?.name}</p>
                            <p className="text-sm text-gray-400">{message.fileInfo?.size}</p>
                          </div>
                        </div>
                      )}
                      <p className="text-right text-xs text-gray-400 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#2a2a2a]">
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#333]">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 bg-[#333] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button type="submit" className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-[#333]">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

