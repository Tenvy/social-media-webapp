import { createClient } from '@supabase/supabase-js'

const supabaseObject: any = {
    url: process.env.SUPABASE_PROJECT_URL,
    key: process.env.SUPABASE_API_KEY
}

const supabase = createClient(supabaseObject.url, supabaseObject.key)

export { supabase }