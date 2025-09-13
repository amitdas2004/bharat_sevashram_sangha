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

    // Get user's students
    const { data: students, error: studentsError } = await supabase
      .from("students")
      .select("*")
      .eq("parent_id", user.id)

    if (studentsError) {
      throw studentsError
    }

    if (!students || students.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No students found for this parent",
        data: [],
      })
    }

    // Get attendance data for all students
    const attendanceData = []

    for (const student of students) {
      const { data: attendance, error: attendanceError } = await supabase
        .from("attendance")
        .select("*")
        .eq("student_id", student.id)
        .order("date", { ascending: false })
        .limit(30)

      if (attendanceError) {
        console.error("Attendance fetch error:", attendanceError)
        continue
      }

      // Calculate statistics
      const totalDays = attendance?.length || 0
      const presentDays = attendance?.filter((a) => a.status === "present").length || 0
      const absentDays = attendance?.filter((a) => a.status === "absent").length || 0
      const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100 * 10) / 10 : 0

      attendanceData.push({
        student,
        currentMonth: {
          totalDays,
          presentDays,
          absentDays,
          percentage,
        },
        recentAttendance: attendance || [],
      })
    }

    return NextResponse.json({
      success: true,
      message: "Attendance data retrieved successfully",
      data: attendanceData,
    })
  } catch (error) {
    console.error("Attendance fetch error:", error)
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

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { studentId, date, status, remarks } = body

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

    // Validate input
    if (!studentId || !date || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID, date, and status are required",
          data: null,
        },
        { status: 400 },
      )
    }

    // Verify student belongs to authenticated parent
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .eq("parent_id", user.id)
      .single()

    if (studentError || !student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found or access denied",
          data: null,
        },
        { status: 403 },
      )
    }

    // Insert attendance record
    const { data: attendanceRecord, error: insertError } = await supabase
      .from("attendance")
      .insert({
        student_id: studentId,
        date,
        status,
        remarks: remarks || null,
      })
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({
      success: true,
      message: "Attendance marked successfully",
      data: attendanceRecord,
    })
  } catch (error) {
    console.error("Attendance mark error:", error)
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
