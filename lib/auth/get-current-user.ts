import { createClient } from '@/lib/supabase/server'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export async function getCurrentUser(cookieStore: ReadonlyRequestCookies) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null // Supabase is not configured
  }

  const supabase = await createClient(cookieStore)
  const { data } = await supabase.auth.getUser()
  return data.user ?? null
}

export async function getCurrentUserId(cookieStore: ReadonlyRequestCookies) {
  const user = await getCurrentUser(cookieStore)
  return user?.id ?? 'anonymous'
}