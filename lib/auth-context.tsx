"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string
  role: string
}

interface Student {
  id: string
  student_id: string
  full_name: string
  class: string
  section: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  students: Student[]
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  students: [],
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
        await fetchUserData(session.user.id)
      }

      setLoading(false)
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await fetchUserData(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setStudents([])
      }
      setLoading(false)
    })

    getInitialSession()

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (userId: string) => {
    const supabase = createClient()

    // Fetch user profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (profileData) {
      setProfile(profileData)

      // Fetch user's students
      const { data: studentsData } = await supabase.from("students").select("*").eq("parent_id", userId)

      if (studentsData) {
        setStudents(studentsData)
      }
    }
  }

  return <AuthContext.Provider value={{ user, profile, students, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
