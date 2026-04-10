"use client"
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
export interface Items{
    id:string,
    name:string,
    price:number
    main_image:string
    images:string[]
}

function Products() {
    const [items, setItems] = useState<Items[]>([])
    
    const fetchItem = async()=>{
         const{data} = await supabase.from("products").select("*")
    if (data) {
        setItems(data)
        
        
    }
    }
    useEffect(() => {
     fetchItem()
    }, [])
  return (
    <div className='mt-6 flex gap-2 overflow-scroll  mb-5 '>
        {items?.map((item)=><Link href={`product/${item.id}`} key={item.id} className='border rounded-md  w-80'> 
            <Image src={item.main_image}  alt={item.name} width={400} height={400} className='object-cover'/>
            <Button variant={"outline"}  className='w-70 h-12 px-1 ml-2 mb-2 flex items-center justify-between rounded-full'>
                <h1 className='capitalize m-2'>{item.name}</h1>
                <p className='bg-blue-500 w-26 h-9 rounded-full  flex items-center justify-center text-white'>${item.price} USD</p>
            </Button>
        </Link>)}
    </div>
  )
}

export default Products