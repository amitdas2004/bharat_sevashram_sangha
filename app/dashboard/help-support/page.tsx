"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Clock, Phone, Mail, MapPin, MessageCircle, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What are the school timings?",
    answer: "School hours are 8:00 AM - 3:00 PM (Monday-Friday) and 8:00 AM - 12:00 PM (Saturday). Sunday is closed.",
  },
  {
    question: "How can I contact the school?",
    answer:
      "You can reach us at +1 (555) 123-4567 or email info@sunshineacademy.edu. Our office is open during school hours.",
  },
  {
    question: "What is the fee payment deadline?",
    answer: "Monthly fees are due by the 1st of each month. Late fees apply after the 10th of the month.",
  },
  {
    question: "How do I check my child's attendance?",
    answer: "You can view attendance records in the 'Attendance' section of this portal, updated daily.",
  },
  {
    question: "When are parent-teacher meetings?",
    answer: "Parent-teacher meetings are held quarterly. Check the 'Events & Notices' section for upcoming dates.",
  },
  {
    question: "How do I update my contact information?",
    answer:
      "Contact the school office to update your information, or use the 'General Info' section to view current details.",
  },
]

export default function HelpSupportPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm here to help answer your questions about Sunshine Academy. You can ask me about school timings, holidays, contact information, and more!",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage = { type: "user", content: inputMessage }
    setMessages((prev) => [...prev, userMessage])

    // Simple FAQ matching
    const lowerInput = inputMessage.toLowerCase()
    let botResponse =
      "I'm sorry, I don't have information about that. Please contact the school office at +1 (555) 123-4567 for assistance."

    if (lowerInput.includes("timing") || lowerInput.includes("hours") || lowerInput.includes("time")) {
      botResponse =
        "School hours are 8:00 AM - 3:00 PM (Monday-Friday) and 8:00 AM - 12:00 PM (Saturday). Sunday is closed."
    } else if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("call")) {
      botResponse =
        "You can reach us at +1 (555) 123-4567 or email info@sunshineacademy.edu. Our office is open during school hours."
    } else if (lowerInput.includes("fee") || lowerInput.includes("payment") || lowerInput.includes("due")) {
      botResponse =
        "Monthly fees are due by the 1st of each month. Late fees apply after the 10th of the month. You can view your fee details in the Finance section."
    } else if (lowerInput.includes("attendance")) {
      botResponse =
        "You can view your child's attendance records in the 'Attendance' section of this portal, which is updated daily."
    } else if (lowerInput.includes("holiday") || lowerInput.includes("vacation")) {
      botResponse =
        "School holidays and important dates are listed in the 'Events & Notices' section. We follow the state academic calendar."
    } else if (lowerInput.includes("grade") || lowerInput.includes("marks") || lowerInput.includes("result")) {
      botResponse = "You can check your child's grades and academic progress in the 'Academics' section of this portal."
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", content: botResponse }])
    }, 1000)

    setInputMessage("")
  }

  const handleFAQClick = (answer: string) => {
    setMessages((prev) => [...prev, { type: "bot", content: answer }])
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get instant help and answers to your questions about Sunshine Academy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b flex-shrink-0">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                School Assistant
              </CardTitle>
              <CardDescription>Ask me anything about school policies, timings, fees, and more</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[400px]">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg break-words ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t p-4 flex-shrink-0">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ and Contact Info */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">School Hours</p>
                  <p className="text-sm text-gray-600">Mon-Fri: 8:00 AM - 3:00 PM</p>
                  <p className="text-sm text-gray-600">Sat: 8:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">info@sunshineacademy.edu</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-600">123 Education St, Learning City, LC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <Button
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-wrap"
                    onClick={() => handleFAQClick(faq.answer)}
                  >
                    <div>
                      <p className="font-medium text-sm">{faq.question}</p>
                    </div>
                  </Button>
                  {index < faqs.length - 1 && <div className="border-b mt-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
