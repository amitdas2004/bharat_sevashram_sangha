import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AcademicsPage() {
  const subjects = [
    { name: "Mathematics", grade: "A-", percentage: 88, teacher: "Ms. Johnson", trend: "up" },
    { name: "English Literature", grade: "B+", percentage: 85, teacher: "Mr. Smith", trend: "stable" },
    { name: "Physics", grade: "A", percentage: 92, teacher: "Dr. Wilson", trend: "up" },
    { name: "Chemistry", grade: "B", percentage: 82, teacher: "Ms. Davis", trend: "down" },
    { name: "Biology", grade: "A+", percentage: 95, teacher: "Dr. Martinez", trend: "up" },
    { name: "History", grade: "B+", percentage: 87, teacher: "Mr. Thompson", trend: "up" },
    { name: "Geography", grade: "A-", percentage: 89, teacher: "Ms. Lee", trend: "stable" },
    { name: "Art & Design", grade: "A+", percentage: 96, teacher: "Mr. Brown", trend: "stable" },
  ]

  const assignments = [
    {
      subject: "Mathematics",
      title: "Calculus Problem Set #12",
      dueDate: "Dec 20, 2024",
      status: "pending",
      priority: "high",
    },
    {
      subject: "English Literature",
      title: "Shakespearean Sonnet Analysis",
      dueDate: "Dec 18, 2024",
      status: "submitted",
      priority: "medium",
    },
    {
      subject: "Physics",
      title: "Quantum Mechanics Lab Report",
      dueDate: "Dec 22, 2024",
      status: "pending",
      priority: "high",
    },
    {
      subject: "Chemistry",
      title: "Organic Compounds Research",
      dueDate: "Dec 25, 2024",
      status: "in-progress",
      priority: "medium",
    },
    {
      subject: "Biology",
      title: "Cell Division Presentation",
      dueDate: "Dec 19, 2024",
      status: "submitted",
      priority: "low",
    },
  ]

  const recentTests = [
    { subject: "Mathematics", test: "Trigonometry Test", score: 94, maxScore: 100, date: "Dec 10, 2024" },
    { subject: "Physics", test: "Mechanics Quiz", score: 87, maxScore: 90, date: "Dec 8, 2024" },
    { subject: "English Literature", test: "Poetry Analysis", score: 78, maxScore: 85, date: "Dec 5, 2024" },
    { subject: "Chemistry", test: "Periodic Table Quiz", score: 45, maxScore: 50, date: "Dec 3, 2024" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Performance</h1>
        <p className="text-gray-600">Emma Johnson's comprehensive academic overview for Grade 11-A</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Subject Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.teacher}</p>
                    <div className="mt-2">
                      <Progress value={subject.percentage} className="h-2" />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-gray-900">{subject.grade}</div>
                    <div className="text-sm text-gray-500">{subject.percentage}%</div>
                    <Badge
                      variant={
                        subject.trend === "up" ? "default" : subject.trend === "down" ? "destructive" : "secondary"
                      }
                      className="text-xs mt-1"
                    >
                      {subject.trend === "up" ? "↗ Improving" : subject.trend === "down" ? "↘ Declining" : "→ Stable"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignments & Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                    <p className="text-sm text-gray-500">{assignment.subject}</p>
                    <p className="text-xs text-gray-400 mt-1">Due: {assignment.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        assignment.status === "submitted"
                          ? "default"
                          : assignment.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                      className="mb-1"
                    >
                      {assignment.status}
                    </Badge>
                    <div className="text-xs text-gray-500">{assignment.priority} priority</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{test.test}</h3>
                    <p className="text-sm text-gray-500">{test.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {test.score}/{test.maxScore}
                    </div>
                    <div className="text-sm text-gray-500">{Math.round((test.score / test.maxScore) * 100)}%</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{test.date}</div>
                <Progress value={(test.score / test.maxScore) * 100} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
