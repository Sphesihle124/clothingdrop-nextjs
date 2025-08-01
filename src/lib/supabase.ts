import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Check if we're in demo mode
const isDemoMode = supabaseUrl.includes('demo-project') || supabaseAnonKey === 'demo-key'

export const supabase = isDemoMode
  ? null // Don't create client in demo mode
  : createClient(supabaseUrl, supabaseAnonKey)

// Client-side Supabase client for authentication and real-time features
export const createClientComponentClient = () => {
  if (isDemoMode) {
    console.warn('Running in demo mode - Supabase features disabled')
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client with service role key for admin operations
export const createServerClient = () => {
  if (isDemoMode) {
    console.warn('Running in demo mode - Supabase features disabled')
    return null
  }
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
  )
}

// Export demo mode flag for other components to check
export { isDemoMode }
