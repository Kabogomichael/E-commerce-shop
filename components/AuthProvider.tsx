"use client"
import { supabase } from '@/lib/supabase'
import React, { useEffect } from 'react'

function AuthProvider({children}:{children:React.ReactNode}) {
    useEffect(() => {
        const {data:listener}=  supabase.auth.onAuthStateChange((event,session)=>{
            console.log("event",event);
            console.log("session",session);
            
        })
        return ()=>{
            listener.subscription.unsubscribe()
        };
      
    }, [])
    
  return (
    <>{children}</>
  )
}

export default AuthProvider