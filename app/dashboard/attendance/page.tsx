import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, TrendingUp } from "lucide-react"

export default function AttendancePage() {
  const monthlyData = [
    { month: "September", present: 20, absent: 2, late: 1, percentage: 91, workingDays: 22 },
    { month: "October", present: 22, absent: 1, late: 0, percentage: 96, workingDays: 23 },
    { month: "November", present: 19, absent: 2, late: 2, percentage: 90, workingDays: 21 },
    { month: "December", present: 15, absent: 1, late: 1, percentage: 94, workingDays: 16 },
  ]

  const recentAttendance = [
    { date: "Dec 16, 2024", day: "Monday", status: "present", timeIn: "8:15 AM", timeOut: "3:30 PM" },
    { date: "Dec 15, 2024", day: "Sunday", status: "holiday", timeIn: "-", timeOut: "-" },
    { date: "Dec 14, 2024", day: "Saturday", status: "holiday", timeIn: "-", timeOut: "-" },
    { date: "Dec 13, 2024", day: "Friday", status: "present", timeIn: "8:10 AM", timeOut: "3:30 PM" },
    { date: "Dec 12, 2024", day: "Thursday", status: "late", timeIn: "8:25 AM", timeOut: "3:30 PM" },
    { date: "Dec 11, 2024", day: "Wednesday", status: "present", timeIn: "8:05 AM", timeOut: "3:30 PM" },
    { date: "Dec 10, 2024", day: "Tuesday", status: "absent", timeIn: "-", timeOut: "-" },
    { date: "Dec 9, 2024", day: "Monday", status: "present", timeIn: "8:12 AM", timeOut: "3:30 PM" },
  ]

  const subjectAttendance = [
    { subject: "Mathematics", attended: 45, total: 48, percentage: 94 },
    { subject: "English Literature", attended: 42, total: 44, percentage: 95 },
    { subject: "Physics", attended: 40, total: 42, percentage: 95 },
    { subject: "Chemistry", attended: 38, total: 41, percentage: 93 },
    { subject: "Biology", attended: 44, total: 46, percentage: 96 },
    { subject: "History", attended: 39, total: 42, percentage: 93 },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Overview</h1>
        <p className="text-gray-600">Emma Johnson's comprehensive attendance tracking for Academic Year 2024-25</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <p className="text-sm text-gray-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
              +2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Days Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">76</div>
            <p className="text-sm text-gray-500">Out of 82 working days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Days Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
            <p className="text-sm text-gray-500">2 sick, 3 personal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 mb-2">4</div>
            <p className="text-sm text-gray-500">This academic year</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Monthly Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-900">{month.month}</div>
                    <Badge
                      variant={
                        month.percentage >= 95 ? "default" : month.percentage >= 90 ? "secondary" : "destructive"
                      }
                    >
                      {month.percentage}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <span className="text-green-600">Present: {month.present}</span>
                    <span className="text-red-600">Absent: {month.absent}</span>
                    <span className="text-yellow-600">Late: {month.late}</span>
                  </div>
                  <Progress value={month.percentage} className="h-2 mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectAttendance.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {subject.attended}/{subject.total} classes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{subject.percentage}%</div>
                    <Progress value={subject.percentage} className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Attendance Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAttendance.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-medium text-gray-900">{day.date}</div>
                    <div className="text-sm text-gray-500">{day.day}</div>
                  </div>
                  <Badge
                    variant={
                      day.status === "present"
                        ? "default"
                        : day.status === "late"
                          ? "secondary"
                          : day.status === "absent"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {day.status}
                  </Badge>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>In: {day.timeIn}</div>
                  <div>Out: {day.timeOut}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
