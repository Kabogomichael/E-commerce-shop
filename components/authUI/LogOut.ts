"use client"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const LogOut=async ()=>{
    const router = useRouter()
  const{error} = await supabase.auth.signOut()
  if (error) {
    toast(error.message)
    
  }
  router.refresh()
    router.push("/")
}