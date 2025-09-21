"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

interface ChatbotDropdownProps {
  onClose: () => void
}

export function ChatbotDropdown({ onClose }: ChatbotDropdownProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help answer your questions about Bharat Sevashram Sangha. You can ask me about school timings, holidays, contact information, and more!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const faqResponses: Record<string, string> = {
    "school timings":
      "School timings are Monday-Friday: 8:00 AM - 3:00 PM, Saturday: 8:00 AM - 12:00 PM, Sunday: Closed.",
    timings: "School timings are Monday-Friday: 8:00 AM - 3:00 PM, Saturday: 8:00 AM - 12:00 PM, Sunday: Closed.",
    holidays:
      "Upcoming holidays include Winter Break (Dec 23 - Jan 6), Spring Break (Mar 15-22), and Summer Break (Jun 15 - Aug 15).",
    holiday:
      "Upcoming holidays include Winter Break (Dec 23 - Jan 6), Spring Break (Mar 15-22), and Summer Break (Jun 15 - Aug 15).",
    contact:
      "You can contact us at +1 8017019305 or email info@sunshineacademy.edu. We're located at 123 Education St, Learning City, LC 12345.",
    phone: "Our phone number is +1 8017019305.",
    email: "Our email address is info@sunshineacademy.edu.",
    address: "We're located at 123 Education St, Learning City, LC 12345.",
    leave: "To apply for leave, please contact your child's class teacher or the main office at +1 8017019305.",
    admin:
      "You can contact the admin office at +1 8017019305 or email info@sunshineacademy.edu during school hours.",
    fees: "For fee-related queries, please contact the finance office or check the Finance section in your parent portal.",
    uniform: "Please refer to the latest uniform policy notice in the Events & Notices section of your dashboard.",
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setInputValue("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      })
      const data = await res.json()

      let responseText = data?.reply || "Sorry, I couldn't get a response right now."
      
      if (!res.ok) {
        const errorMessage = data?.error || "Unknown error"
        responseText = errorMessage.includes("API key") ? 
          "❌ Chat assistant is not configured yet. Please contact the administrator." : 
          `❌ Assistant error: ${errorMessage}`
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (e) {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "There was an error contacting the assistant.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Card ref={dropdownRef} className="w-80 h-96 shadow-xl bg-white border flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">School Assistant</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isBot ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
