"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      console.log("Attempting login for:", email)
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("Auth response:", { data, error: authError })

      if (authError) {
        console.error("Auth error:", authError)
        setError(authError.message)
        return
      }

      if (!data.user) {
        setError("No user returned from authentication")
        return
      }

      // Check if user needs email verification
      if (data.user.email_confirmed_at === null) {
        setError("Please check your email and click the verification link before logging in.")
        return
      }

      // Verify session is established before navigating
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      console.log("Session data:", sessionData)
      
      if (sessionError) {
        console.error("Session error:", sessionError)
        setError(sessionError.message)
        return
      }

      if (sessionData?.session?.user) {
        console.log("Login successful, redirecting to dashboard")
        router.push("/dashboard")
      } else {
        setError("Login succeeded but no session found. Check cookie settings and environment variables.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="parent@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-sm text-gray-500 text-center mt-2">
            Don't have an account? Contact school administration.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
