"use client"
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function UserAvatar() {
    const [user, setUser] = useState<any>(null)
    useEffect(() => {
        const getUser =async()=>{
            const {data}= await supabase.auth.getUser()
            setUser(data.user)

        }
        getUser()
    }, [])


    

  return (
    <div  >
      
        {user ? <Avatar className='w-7 h-7'>
    <AvatarImage src={user.user_metadata.avatar_url } />
    <h1>{user.data}</h1>
    
    <AvatarFallback>CN</AvatarFallback>
    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
  </Avatar> : " "}
  
  </div>
  )
}

export default UserAvatar