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

    // Get finance data for all students
    const financeData = []

    for (const student of students) {
      const { data: finances, error: financeError } = await supabase
        .from("finance")
        .select("*")
        .eq("student_id", student.id)
        .order("created_at", { ascending: false })

      if (financeError) {
        console.error("Finance fetch error:", financeError)
        continue
      }

      // Calculate totals
      const totalPending =
        finances?.filter((f) => f.status === "pending").reduce((sum, f) => sum + Number.parseFloat(f.amount), 0) || 0
      const totalPaid =
        finances?.filter((f) => f.status === "paid").reduce((sum, f) => sum + Number.parseFloat(f.amount), 0) || 0
      const nextDue = finances?.find((f) => f.status === "pending" && new Date(f.due_date) >= new Date())

      financeData.push({
        student,
        summary: {
          totalPending,
          totalPaid,
          nextDueDate: nextDue?.due_date || null,
          nextDueAmount: nextDue?.amount || 0,
        },
        transactions: finances || [],
      })
    }

    return NextResponse.json({
      success: true,
      message: "Finance data retrieved successfully",
      data: financeData,
    })
  } catch (error) {
    console.error("Finance fetch error:", error)
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
    const { financeId, paymentMethod, transactionId } = body

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
    if (!financeId || !paymentMethod) {
      return NextResponse.json(
        {
          success: false,
          message: "Finance ID and payment method are required",
          data: null,
        },
        { status: 400 },
      )
    }

    // Get the finance record and verify ownership
    const { data: financeRecord, error: financeError } = await supabase
      .from("finance")
      .select(`
        *,
        students!inner(parent_id)
      `)
      .eq("id", financeId)
      .eq("students.parent_id", user.id)
      .single()

    if (financeError || !financeRecord) {
      return NextResponse.json(
        {
          success: false,
          message: "Finance record not found or access denied",
          data: null,
        },
        { status: 403 },
      )
    }

    // Update payment status
    const { data: updatedRecord, error: updateError } = await supabase
      .from("finance")
      .update({
        status: "paid",
        paid_date: new Date().toISOString().split("T")[0],
        payment_method: paymentMethod,
        transaction_id: transactionId || `TXN-${Date.now()}`,
        updated_at: new Date().toISOString(),
      })
      .eq("id", financeId)
      .select()
      .single()

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      message: "Payment processed successfully",
      data: updatedRecord,
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Payment processing failed",
        data: null,
      },
      { status: 500 },
    )
  }
}
