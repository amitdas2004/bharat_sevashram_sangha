"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Send, CheckCircle } from "lucide-react"

export default function ReportPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    class: "",
    query: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("https://formspree.io/f/mrbyzgpo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          class: formData.class,
          query: formData.query,
          _subject: `Report from ${formData.fullName} - Class ${formData.class}`
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ fullName: "", class: "", query: "" })
      } else {
        setError("Failed to submit report. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setError("")
  }

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Report Submitted Successfully!</CardTitle>
            <CardDescription>
              Thank you for your report. We have received your query and will get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={resetForm} className="w-full">
              Submit Another Report
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          Report an Issue
        </h1>
        <p className="text-gray-600">
          Submit a report or query about any issues, concerns, or suggestions you may have.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Form</CardTitle>
          <CardDescription>
            Please fill out the form below with your details and query. We'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Input
                id="class"
                name="class"
                type="text"
                placeholder="Enter your class (e.g., Class 5, Class 10)"
                value={formData.class}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="query">Query/Report *</Label>
              <Textarea
                id="query"
                name="query"
                placeholder="Describe your issue, concern, or suggestion in detail..."
                value={formData.query}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !formData.fullName || !formData.class || !formData.query}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-medium text-blue-900 mb-2">Important Notes:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All fields marked with * are required</li>
          <li>• Please provide as much detail as possible in your query</li>
          <li>• We will respond to your report within 2-3 business days</li>
          <li>• For urgent matters, please contact the office directly at 080170 19305</li>
        </ul>
      </div>
    </div>
  )
}
