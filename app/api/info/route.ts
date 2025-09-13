import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
          data: null,
        },
        { status: 401 },
      )
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") // 'contact', 'timings', 'policies', etc.

    let query = supabase.from("school_info").select("*").eq("is_active", true).order("created_at", { ascending: true })

    // Filter by category if specified
    if (category) {
      query = query.eq("category", category)
    }

    const { data: schoolInfo, error: infoError } = await query

    if (infoError) {
      throw infoError
    }

    // Group data by category
    const groupedData: Record<string, any[]> = {}
    schoolInfo?.forEach((info) => {
      if (!groupedData[info.category]) {
        groupedData[info.category] = []
      }
      groupedData[info.category].push({
        title: info.title,
        content: info.content,
        id: info.id,
      })
    })

    return NextResponse.json({
      success: true,
      message: "School information retrieved successfully",
      data: groupedData,
    })
  } catch (error) {
    console.error("School info fetch error:", error)
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
