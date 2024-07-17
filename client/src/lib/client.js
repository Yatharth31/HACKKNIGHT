import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxqorslnlvktznjryboi.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW9yc2xubHZrdHpuanJ5Ym9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI5ODIyMDksImV4cCI6MjAwODU1ODIwOX0.PalhVnF3VN2TNC1iVUGq5yjDbgY99q1oSRmhwUHvcv0'
export const supabase = createClient(supabaseUrl, supabaseKey)
