import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FinancePage() {
  const feeHistory = [
    { month: "December 2024", amount: 500, status: "paid", date: "Dec 1, 2024" },
    { month: "November 2024", amount: 500, status: "paid", date: "Nov 1, 2024" },
    { month: "October 2024", amount: 500, status: "paid", date: "Oct 1, 2024" },
    { month: "September 2024", amount: 500, status: "paid", date: "Sep 1, 2024" },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance</h1>
        <p className="text-gray-600">Fee status and payment history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">$0</div>
            <p className="text-sm text-gray-500">All fees paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">Jan 1</div>
            <p className="text-sm text-gray-500">Monthly fee: $500</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">$2,000</div>
            <p className="text-sm text-gray-500">This academic year</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{payment.month}</h3>
                  <p className="text-sm text-gray-500">Paid on {payment.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${payment.amount}</div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {payment.status}
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
