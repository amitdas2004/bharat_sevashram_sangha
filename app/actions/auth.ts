"use server"

import { createServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function signUpAction(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const parentName = formData.get("parentName") as string
  const childName = formData.get("childName") as string
  const childClass = formData.get("childClass") as string

  // Create the user account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard`,
    },
  })

  if (authError) {
    console.error("Auth error:", authError)
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: "Failed to create user account" }
  }

  // Create profile using service role to bypass RLS temporarily
  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user.id,
    email,
    full_name: parentName,
    role: "parent",
  })

  if (profileError) {
    console.error("Profile creation error:", profileError)
    return { error: "Failed to create user profile" }
  }

  // Create student record
  const { error: studentError } = await supabase.from("students").insert({
    student_id: `STU${Date.now()}`,
    full_name: childName,
    class: childClass,
    section: "A",
    parent_id: authData.user.id,
  })

  if (studentError) {
    console.error("Student creation error:", studentError)
    return { error: "Failed to create student record" }
  }

  return { success: true }
}
