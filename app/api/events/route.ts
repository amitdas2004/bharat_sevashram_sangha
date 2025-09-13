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
    const type = searchParams.get("type") // 'upcoming', 'past', or 'all'
    const category = searchParams.get("category")

    let query = supabase.from("events").select("*").eq("is_active", true).order("event_date", { ascending: true })

    // Filter by category if specified
    if (category) {
      query = query.eq("category", category)
    }

    const { data: events, error: eventsError } = await query

    if (eventsError) {
      throw eventsError
    }

    // Separate events by date
    const today = new Date().toISOString().split("T")[0]
    const upcomingEvents = events?.filter((event) => event.event_date >= today) || []
    const pastEvents = events?.filter((event) => event.event_date < today) || []

    let responseData = {
      upcomingEvents,
      pastEvents,
    }

    // Filter by type if specified
    if (type === "upcoming") {
      responseData = { upcomingEvents, pastEvents: [] }
    } else if (type === "past") {
      responseData = { upcomingEvents: [], pastEvents }
    }

    return NextResponse.json({
      success: true,
      message: "Events retrieved successfully",
      data: responseData,
    })
  } catch (error) {
    console.error("Events fetch error:", error)
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
