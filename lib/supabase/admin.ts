import { createClient } from "@supabase/supabase-js"

// Admin client: use only on the server with the service role key.
export function createAdminClient() {
  const url = 'https://tlbuxutocpuxiovahmzn.supabase.co'
  const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsYnV4dXRvY3B1eGlvdmFobXpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc5MDcyOCwiZXhwIjoyMDczMzY2NzI4fQ.zDZovUeR0FEucH5nFCKrUUhuFSR2523mO_X3VChGSIA'

  if (!url || !serviceKey) {
    throw new Error(
      "Missing Supabase admin environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    )
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}


