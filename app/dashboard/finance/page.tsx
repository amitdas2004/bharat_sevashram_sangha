import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IndianRupeeIcon, CreditCard, FileText, Download } from "lucide-react"

export default function FinancePage() {
  const feeStructure = [
    { category: "Tuition Fee", amount: 450, frequency: "Monthly" },
    { category: "Library Fee", amount: 25, frequency: "Monthly" },
    { category: "Lab Fee", amount: 75, frequency: "Monthly" },
    { category: "Sports Fee", amount: 30, frequency: "Monthly" },
    { category: "Transport Fee", amount: 120, frequency: "Monthly" },
  ]

  const feeHistory = [
    {
      month: "December 2024",
      amount: 700,
      status: "paid",
      date: "Dec 1, 2024",
      method: "Online Banking",
      receipt: "RCP-2024-12-001",
    },
    {
      month: "November 2024",
      amount: 700,
      status: "paid",
      date: "Nov 1, 2024",
      method: "Credit Card",
      receipt: "RCP-2024-11-001",
    },
    {
      month: "October 2024",
      amount: 700,
      status: "paid",
      date: "Oct 1, 2024",
      method: "Bank Transfer",
      receipt: "RCP-2024-10-001",
    },
    {
      month: "September 2024",
      amount: 700,
      status: "paid",
      date: "Sep 1, 2024",
      method: "Online Banking",
      receipt: "RCP-2024-09-001",
    },
  ]

  const additionalFees = [
    { item: "Annual Day Costume", amount: 45, dueDate: "Jan 15, 2025", status: "pending" },
    { item: "Science Fair Materials", amount: 30, dueDate: "Jan 10, 2025", status: "pending" },
    { item: "Field Trip - Science Museum", amount: 25, dueDate: "Dec 20, 2024", status: "paid" },
    { item: "Yearbook", amount: 35, dueDate: "Feb 1, 2025", status: "pending" },
  ]

  const scholarships = [
    { name: "Academic Excellence Scholarship", amount: 200, period: "Semester 1", status: "Applied" },
    { name: "Sports Achievement Award", amount: 150, period: "Annual", status: "Received" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Overview</h1>
        <p className="text-gray-600">Complete fee management and payment tracking for Emma Johnson</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <IndianRupeeIcon className="h-4 w-4 mr-1" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">₹0</div>
            <p className="text-sm text-gray-500">All monthly fees paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">Jan 1</div>
            <p className="text-sm text-gray-500">Monthly fee: ₹700</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Paid (Rupees)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹2,800</div>
            <p className="text-sm text-gray-500">Academic Year 2024-25</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-2">₹130</div>
            <p className="text-sm text-gray-500">Additional fees due</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {feeStructure.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{fee.category}</h3>
                    <p className="text-sm text-gray-500">{fee.frequency}</p>
                  </div>
                  <div className="text-lg font-bold text-gray-900">₹{fee.amount}</div>
                </div>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Monthly Fee</span>
                  <span className="text-xl font-bold text-blue-600">₹700</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Fees & Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {additionalFees.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{fee.item}</h3>
                    <p className="text-sm text-gray-500">Due: {fee.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">₹{fee.amount}</div>
                    <Badge variant={fee.status === "paid" ? "default" : "secondary"}>{fee.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{payment.month}</h3>
                  <p className="text-sm text-gray-500">
                    Paid on {payment.date} via {payment.method}
                  </p>
                  <p className="text-xs text-gray-400">Receipt: {payment.receipt}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">₹{payment.amount}</div>
                  <Badge variant="default" className="bg-green-100 text-green-800 mb-2">
                    {payment.status}
                  </Badge>
                  <div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Scholarships & Awards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scholarships.map((scholarship, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{scholarship.name}</h3>
                  <p className="text-sm text-gray-500">{scholarship.period}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">-₹{scholarship.amount}</div>
                  <Badge variant={scholarship.status === "Received" ? "default" : "secondary"}>
                    {scholarship.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
