import { createClient } from "@supabase/supabase-js"
const supabseUrl = "https://mmjtualaqjusseitgmje.supabase.co" 
const supabseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tanR1YWxhcWp1c3NlaXRnbWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTU5NzcsImV4cCI6MjA5MDIzMTk3N30.FcPbprHAhmQ8FYuJTcGFbjOUYSn0tPszTrY7E5Ec_YY"

export const supabase =createClient(supabseUrl,supabseKey)