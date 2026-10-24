import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseUrl.startsWith("http") && (supabaseAnonKey || supabaseServiceKey)
);

// Client-side Supabase client (respects RLS)
export const supabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey)
  : null;

// Server-side Supabase client with service role key (for privileged operations / server actions)
export const supabaseServer = isSupabaseConfigured && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : supabaseClient;
