import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AttendancePage() {
  const monthlyData = [
    { month: "September", present: 20, absent: 2, percentage: 91 },
    { month: "October", present: 22, absent: 1, percentage: 96 },
    { month: "November", present: 19, absent: 2, percentage: 90 },
    { month: "December", present: 15, absent: 1, percentage: 94 },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance</h1>
        <p className="text-gray-600">Emma's attendance summary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
            <p className="text-sm text-gray-500">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Days Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">76</div>
            <p className="text-sm text-gray-500">Out of 81 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Days Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">5</div>
            <p className="text-sm text-gray-500">This academic year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{month.month}</div>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="text-green-600">Present: {month.present}</span>
                  <span className="text-red-600">Absent: {month.absent}</span>
                  <span className="font-medium">{month.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
