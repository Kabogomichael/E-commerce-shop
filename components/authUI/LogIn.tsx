"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'


function LogIn() {
  const router = useRouter()
// const [isLogIn, setIsLogIn] = useState(false)
const [fullName, setFullName] = useState("")
const [password, setPassword] = useState("")
const [email, setEmail] = useState("")

    const handleSubmit= async(e:React.FormEvent)=>{
        e.preventDefault();
        
          const {data,error} = await supabase.auth.signInWithPassword({email,password})
          if (error) {
            toast.error(error.message)
            return;
            
          }
          
          if(data.user){
            toast.success("Successful  Logged In :)",{position:"top-right"})
            // update user activity

            await supabase.from("users").update({
              is_active:true,
              last_seen: new Date()
            }).eq("id",data.user.id)
            router.refresh()
          router.push("/")
          }

          
        
        


    }
  return (
    <div className='  min-h-screen flex items-center justify-center mx-2 md:mx-0'>

        <div className=' border p-8 rounded-2xl shadow-md w-full max-w-md '>
        <h1 className='text-center text-2xl mb-6 font-bold'> LogIn</h1>
        <form className='space-y-4 w-full ' onSubmit={(e)=> handleSubmit(e)}>
            <div>
            <Label>Full name</Label>
            <Input type='text' value={fullName} onChange={(e)=> setFullName(e.target.value)} placeholder='full name' className='w-full  mt-2' />
            </div>
            <div>
            <Label> Email</Label>
            <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='example@email' className='w-full mt-2'  />
            </div>

            <div>
            <Label> Password</Label>
            <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' className='w-full mt-2' />
            </div>
            <Button type='submit' variant={"default"} className='w-full cursor-pointer bg-primary'>LogIn</Button>
            <p className='text-sm '> Don't have an account?
            <Link href={'/signIn'} className='underline text-blue-600 ml-1' >
            Create account
            </Link>
            </p>

        </form>
        </div>
    </div>
  )
}

export default LogIn