"use client"

import { useState } from "react"

interface Message {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: boolean
}

const conversations: Message[] = [
  { id: "1", name: "Aarav Sharma", lastMessage: "Can I reschedule my internship?", timestamp: "2 min", unread: true },
  { id: "2", name: "Priya Verma", lastMessage: "Thank you for the feedback", timestamp: "1 hour", unread: false },
  {
    id: "3",
    name: "Rohan Singh",
    lastMessage: "Internship completed successfully",
    timestamp: "5 hours",
    unread: false,
  },
]

export default function MessagesPanel() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  return (
    <div className="w-80 bg-white bg-opacity-5 border border-white border-opacity-10 rounded flex flex-col overflow-hidden hidden lg:flex">
      <div className="px-6 py-4 border-b border-white border-opacity-10">
        <h3 className="text-lg font-bold text-white">Messages</h3>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-white divide-opacity-10">
        {conversations.map((msg) => (
          <button
            key={msg.id}
            onClick={() => setSelectedMessage(msg.id)}
            className={`w-full px-6 py-4 text-left hover:bg-white hover:bg-opacity-5 transition-all ${
              selectedMessage === msg.id ? "bg-white bg-opacity-10" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className={`text-sm font-medium ${msg.unread ? "text-white font-bold" : "text-gray-400"}`}>
                  {msg.name}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">{msg.lastMessage}</p>
              </div>
              {msg.unread && <div className="w-2 h-2 bg-white rounded-full flex-shrink-0 mt-1"></div>}
            </div>
            <p className="text-xs text-gray-500 mt-2">{msg.timestamp}</p>
          </button>
        ))}
      </div>

      {selectedMessage && (
        <div className="p-4 border-t border-white border-opacity-10">
          <input
            type="text"
            placeholder="Type message..."
            className="w-full px-3 py-2 text-xs bg-white bg-opacity-5 border border-white border-opacity-20 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-30"
          />
        </div>
      )}
    </div>
  )
}
