"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help answer your questions about Sunshine Academy. You can ask me about school timings, holidays, contact information, and more!",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const faqResponses: Record<string, string> = {
    "school timings":
      "School timings are Monday-Friday: 8:00 AM - 3:00 PM, Saturday: 8:00 AM - 12:00 PM, Sunday: Closed.",
    timings: "School timings are Monday-Friday: 8:00 AM - 3:00 PM, Saturday: 8:00 AM - 12:00 PM, Sunday: Closed.",
    holidays:
      "Upcoming holidays include Winter Break (Dec 23 - Jan 6), Spring Break (Mar 15-22), and Summer Break (Jun 15 - Aug 15).",
    holiday:
      "Upcoming holidays include Winter Break (Dec 23 - Jan 6), Spring Break (Mar 15-22), and Summer Break (Jun 15 - Aug 15).",
    contact:
      "You can contact us at +1 (555) 123-4567 or email info@sunshineacademy.edu. We're located at 123 Education St, Learning City, LC 12345.",
    phone: "Our phone number is +1 (555) 123-4567.",
    email: "Our email address is info@sunshineacademy.edu.",
    address: "We're located at 123 Education St, Learning City, LC 12345.",
    leave: "To apply for leave, please contact your child's class teacher or the main office at +1 (555) 123-4567.",
    admin:
      "You can contact the admin office at +1 (555) 123-4567 or email info@sunshineacademy.edu during school hours.",
    fees: "For fee-related queries, please contact the finance office or check the Finance section in your parent portal.",
    uniform: "Please refer to the latest uniform policy notice in the Events & Notices section of your dashboard.",
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simple keyword matching for FAQ responses
    const lowerInput = inputValue.toLowerCase()
    let botResponse =
      "I'm sorry, I didn't understand that. You can ask me about school timings, holidays, contact information, leave applications, or how to contact admin."

    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerInput.includes(keyword)) {
        botResponse = response
        break
      }
    }

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      isBot: true,
      timestamp: new Date(),
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputValue("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 ${isOpen ? "hidden" : "flex"}`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">School Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
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
      )}
    </>
  )
}
