import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient;

try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (e) {
  console.error('Failed to initialize Supabase client:', e);
  // Create a dummy client so the app doesn't crash
  supabase = createClient('https://placeholder.supabase.co', 'placeholder');
}

export { supabase };
