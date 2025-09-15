"use server"

import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { cookies } from "next/headers"

export async function signUpAction(formData: FormData) {
  const supabase = await createServerSupabaseClient()

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

  // Create profile with admin client to bypass RLS (upsert to handle existing users)
  const admin = createAdminClient()
  const { error: profileError } = await admin.from("profiles").upsert({
    id: authData.user.id,
    email,
    full_name: parentName,
    role: "parent",
  })

  if (profileError) {
    console.error("Profile creation error:", profileError)
    return { error: "Failed to create user profile" }
  }

  // Create student record with admin client (check if student already exists for this parent)
  const { data: existingStudents } = await admin.from("students").select("student_id").eq("parent_id", authData.user.id).eq("full_name", childName)
  
  if (!existingStudents || existingStudents.length === 0) {
    const { error: studentError } = await admin.from("students").insert({
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
  }

  return { success: true }
}
