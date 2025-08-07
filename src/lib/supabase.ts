import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// Check if we're in demo mode - more robust detection
export const isDemoMode =
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('demo-project') ||
  supabaseAnonKey === 'demo-key' ||
  supabaseUrl === 'your_supabase_project_url' ||
  supabaseAnonKey === 'your_supabase_anon_key'

// Validate URL format for non-demo mode
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const supabase = (isDemoMode || !isValidUrl(supabaseUrl))
  ? null // Don't create client in demo mode or with invalid URL
  : createClient(supabaseUrl, supabaseAnonKey)

// Client-side Supabase client for authentication and real-time features
export const createClientComponentClient = () => {
  if (isDemoMode || !isValidUrl(supabaseUrl)) {
    console.warn('Running in demo mode - Supabase features disabled')
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client with service role key for admin operations
export const createServerClient = () => {
  if (isDemoMode || !isValidUrl(supabaseUrl)) {
    console.warn('Running in demo mode - Supabase features disabled')
    return null
  }
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'demo-service-key'
  )
}

// Demo mode flag is already exported above
