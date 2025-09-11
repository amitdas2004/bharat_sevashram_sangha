import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AcademicsPage() {
  const subjects = [
    { name: "Mathematics", grade: "A-", percentage: 88, teacher: "Ms. Johnson" },
    { name: "English", grade: "B+", percentage: 85, teacher: "Mr. Smith" },
    { name: "Science", grade: "A", percentage: 92, teacher: "Dr. Wilson" },
    { name: "History", grade: "B", percentage: 82, teacher: "Ms. Davis" },
    { name: "Art", grade: "A+", percentage: 95, teacher: "Mr. Brown" },
  ]

  const assignments = [
    { subject: "Mathematics", title: "Algebra Quiz", dueDate: "Dec 20", status: "pending" },
    { subject: "English", title: "Essay on Shakespeare", dueDate: "Dec 18", status: "submitted" },
    { subject: "Science", title: "Lab Report", dueDate: "Dec 22", status: "pending" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Academics</h1>
        <p className="text-gray-600">Emma's academic performance and assignments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Subject Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.teacher}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{subject.grade}</div>
                    <div className="text-sm text-gray-500">{subject.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-500">{assignment.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-900 mb-1">{assignment.dueDate}</div>
                    <Badge variant={assignment.status === "submitted" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
