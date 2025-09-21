import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName } = body

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        {
          success: false,
          message: "Email, password, and full name are required",
          data: null,
        },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `https://tlbuxutocpuxiovahmzn.supabase.co/dashboard`,
        data: {
          full_name: fullName,
          role: "parent",
        },
      },
    })

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          data: null,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully. Please check your email to confirm your account.",
      data: {
        user: data.user,
        needsEmailConfirmation: !data.session,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        data: null,
      },
      { status: 500 },
    )
  }
}
