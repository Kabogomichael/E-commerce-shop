"use client"
import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'
interface User{
    id:string,
    full_name:string,
    email:string,
    is_active:boolean,
    
}
function User() {
    const [users, setUsers] = useState<User[]>([])
    const fetchUser = async()=>{
        const {data}= await supabase.from("users").select("*")
        if (data) {
            setUsers(data)
            
        }

    }

    useEffect( ()=>{
      fetchUser()
    
    },[])
    if (users.length <= 1) {
        return <h1 className='text-3xl text-chart-1 dark:text-chart-2 text-center font-bold capitalize'>User not found!</h1>
    }
    
  return (
    <Table className='w-200 md:w-full'>
      <TableCaption>users found</TableCaption>
      <TableHeader >
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Full name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
      
     </TableHeader>

   {users?.map((user,i)=>(<TableBody key={i}>
      <TableRow className='border'>
        <TableCell>{i}</TableCell>
        <TableCell className='capitalize'>{user.full_name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.is_active === true ? <Button className='bg-green-600'>Active</Button>: <Button variant={"destructive"}>Inactive</Button> } </TableCell>
        <TableCell><Button variant={"destructive"} className='mr-2'>delete</Button> <Button >Block</Button></TableCell>
      </TableRow>
     </TableBody>

     
      ))}
   

    </Table>
  )
}

export default User