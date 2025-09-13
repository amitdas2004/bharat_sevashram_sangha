export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T | null
}

export class ApiClient {
  private static getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: this.getAuthHeaders(),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        data: null,
      }
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        data: null,
      }
    }
  }

  // Specific API methods
  static async login(email: string, password: string) {
    return this.post("/api/auth/login", { email, password })
  }

  static async signup(email: string, password: string, name: string, studentId?: string) {
    return this.post("/api/auth/signup", { email, password, name, studentId })
  }

  static async getAttendance(studentId?: string) {
    const params = studentId ? `?studentId=${studentId}` : ""
    return this.get(`/api/attendance${params}`)
  }

  static async markAttendance(
    studentId: string,
    date: string,
    status: string,
    checkIn?: string,
    checkOut?: string,
    reason?: string,
  ) {
    return this.post("/api/attendance", { studentId, date, status, checkIn, checkOut, reason })
  }

  static async getFinance(studentId?: string) {
    const params = studentId ? `?studentId=${studentId}` : ""
    return this.get(`/api/finance${params}`)
  }

  static async makePayment(studentId: string, amount: number, type: string, method: string, feeId?: string) {
    return this.post("/api/finance", { studentId, amount, type, method, feeId })
  }

  static async getEvents(type?: string, category?: string) {
    const params = new URLSearchParams()
    if (type) params.append("type", type)
    if (category) params.append("category", category)
    const queryString = params.toString()
    return this.get(`/api/events${queryString ? `?${queryString}` : ""}`)
  }

  static async getSchoolInfo(section?: string) {
    const params = section ? `?section=${section}` : ""
    return this.get(`/api/info${params}`)
  }
}
