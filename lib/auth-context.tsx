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
      console.log("[AuthProvider] Fetching initial session...")
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        console.log("[AuthProvider] Initial session user:", session.user.id)
        setUser(session.user)
        await fetchUserData(session.user.id)
      } else {
        console.log("[AuthProvider] No initial session user")
      }

      setLoading(false)
    }

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthProvider] onAuthStateChange:", event, session?.user?.id)
      if (session?.user) {
        setUser(session.user)
        await fetchUserData(session.user.id)
      } else {
        console.log("[AuthProvider] No session after auth state change")
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
    console.log("[AuthProvider] Fetching user data for:", userId)
    const supabase = createClient()

    // Fetch user profile
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (profileData) {
      console.log("[AuthProvider] Loaded profile:", profileData?.email)
      setProfile(profileData)

      // Fetch user's students
      const { data: studentsData } = await supabase.from("students").select("*").eq("parent_id", userId)

      if (studentsData) {
        console.log("[AuthProvider] Loaded students count:", studentsData.length)
        setStudents(studentsData)
      }
    } else {
      console.log("[AuthProvider] No profile found for user")
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
