import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lqmclqquhrlimkdpgfcs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzk1MjkwOSwiZXhwIjoxOTU5NTI4OTA5fQ.0M02xzzYdmF4Ii1Yw8LJ-GRJLVmFpD6x_-u5z5OhQ3U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)