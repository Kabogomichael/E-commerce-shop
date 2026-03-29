"use client"
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

async function DashBoard() {
    const router = useRouter()
    const {data:{user}} = await supabase.auth.getUser()
    if (!user) {
        router.push('/logIn')
       
    }
  return (
    <div>DashBoard</div>
  )
}

export default DashBoard