import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

let supabase = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  console.warn('Supabase credentials not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY')
  // Create a mock client to prevent errors
  supabase = {
    auth: { onAuthStateChange: () => {} },
    from: () => ({ select: () => Promise.resolve({ data: null, error: null }) })
  }
}

export { supabase }
export default supabase
