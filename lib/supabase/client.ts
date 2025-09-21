import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = 'https://tlbuxutocpuxiovahmzn.supabase.co'
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYnV4dXRvY3B1eGlvdmFobXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTA3MjgsImV4cCI6MjA3MzM2NjcyOH0.ktX7etw81d9TiI-woQ4hFOotBljeesIrS3qOovS8pD8'

  

  return createBrowserClient(url, anonKey)
}
