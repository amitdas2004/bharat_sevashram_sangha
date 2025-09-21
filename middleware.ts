import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Hardcoded Supabase credentials
  const supabaseUrl = 'https://tlbuxutocpuxiovahmzn.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYnV4dXRvY3B1eGlvdmFobXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTA3MjgsImV4cCI6MjA3MzM2NjcyOH0.ktX7etw81d9TiI-woQ4hFOotBljeesIrS3qOovS8pD8'

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    console.log("[middleware] Authenticated user:", user.id, "path:", request.nextUrl.pathname)
  } else {
    console.log("[middleware] No user session", "path:", request.nextUrl.pathname)
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    console.log("[middleware] Redirecting to /login from:", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  const authPaths = ["/login", "/auth/login", "/signup", "/auth/signup"]
  if (user && authPaths.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    console.log("[middleware] User is signed in; redirecting to /dashboard from:", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
