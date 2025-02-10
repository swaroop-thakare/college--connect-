'use client'

import { useState, useEffect } from 'react'
import { Send, User } from 'lucide-react'
import { webSocketService } from '@/lib/websocket'

const initialChats = [
  { id: 1, name: 'General Chat', type: 'group' },
  { id: 2, name: 'Computer Science 101', type: 'group' },
  { id: 3, name: 'John Smith', type: 'individual' },
  { id: 4, name: 'Jane Doe', type: 'individual' },
]

const initialMessages = [
  { id: 1, chatId: 1, sender: 'Alice', content: 'Hello everyone!', timestamp: '2023-05-20T10:30:00Z' },
  { id: 2, chatId: 1, sender: 'Bob', content: 'Hi Alice, how are you?', timestamp: '2023-05-20T10:32:00Z' },
  { id: 3, chatId: 2, sender: 'Professor Johnson', content: 'Don\'t forget about the quiz next week!', timestamp: '2023-05-20T11:00:00Z' },
]

export default function Messaging() {
  const [chats, setChats] = useState(initialChats)
  const [messages, setMessages] = useState(initialMessages)
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [newMessage, setNewMessage] = useState('')
  const [isMobileView, setIsMobileView] = useState(false)
  const [showChatList, setShowChatList] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    webSocketService.connect('wss://your-websocket-server-url.com');

    webSocketService.on('newMessage', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      webSocketService.off('newMessage', () => {});
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        chatId: selectedChat.id,
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      webSocketService.send('newMessage', message);
      setNewMessage('')
    }
  }

  const handleChatSelect = (chat: typeof chats[0]) => {
    setSelectedChat(chat)
    if (isMobileView) {
      setShowChatList(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 gradient-text">Messaging</h1>
      <div className="flex h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
        {(!isMobileView || showChatList) && (
          <div className="w-full md:w-1/3 border-r border-gray-200">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-primary">Chats</h2>
              <ul>
                {chats.map((chat) => (
                  <li
                    key={chat.id}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedChat.id === chat.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <span>{chat.name}</span>
                    <span className="text-xs ml-2 opacity-75">
                      {chat.type === 'group' ? '(Group)' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {(!isMobileView || !showChatList) && (
          <div className="w-full md:w-2/3 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-primary">{selectedChat.name}</h2>
              {isMobileView && (
                <button
                  onClick={() => setShowChatList(true)}
                  className="text-primary hover:text-primary-dark"
                >
                  Back to Chats
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages
                .filter((message) => message.chatId === selectedChat.id)
                .map((message) => (
                  <div key={message.id} className={`mb-4 ${message.sender === 'You' ? 'text-right' : ''}`}>
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-2" />
                      <p className="font-semibold text-sm text-gray-700">{message.sender}</p>
                    </div>
                    <p className={`inline-block rounded-lg py-2 px-4 max-w-xs ${
                      message.sender === 'You' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}>
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow border rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  className="bg-primary text-white rounded-r-lg py-2 px-4 hover:bg-primary-dark transition-colors duration-300"
                >
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

