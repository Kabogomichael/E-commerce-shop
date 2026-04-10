"use client"
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React,{useState} from 'react'
import { toast } from 'sonner'
import CreateProduct from '@/components/uploadimages/CreateProduct'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

 function DashBoardNav() {
   const pathname = usePathname()
   const [side, setSide] = useState(false)
    // const {data:{user}} = await supabase.auth.getUser()
    // if (!user) {
    //     toast("please log in ",)
       
    // }
    const Links=[
      {
        href:"/dashboard",
        name:"dashboard"
      },{
        href:"/dashboard/product",
        name:"create product"
      },{
        href:"/dashboard/user",
        name:"user"
      },


    ]
   
  return (
    <div className=''>
      {side? (<div>
        <div className='flex justify-end mr-2 mt-2'>
          <Button onClick={()=> setSide(false)}>x</Button>
          </div>
        
        <aside className='flex flex-col gap-3  items-center mt-2  md:min-h-full md:w-80'>
        

{Links.map((link,i)=>(
  <Link href={link.href} key={i} className={` ${pathname === link.href ? "bg-primary font-bold text-white   hover:bg-purple-700":"text-gray-700 dark:text-white hover:bg-secondary"} hover:bg-chart-1 border capitalize   w-40 text-center py-2 rounded-md ` }>
{link.name}
</Link>

))}

</aside> </div>):""}
<div className='flex justify-end mr-2 mt-2'>
  <Button variant={"outline"} onClick={()=> setSide(true)} className={`${side?"hidden":""} md:hidden`}>=</Button>
</div>
      
<div className='hidden md:block'>


      <aside className='flex flex-col gap-3  items-center mt-24  md:min-h-full md:w-80'>

      
     
      {Links.map((link,i)=>(
        <Link href={link.href} key={i} className={` ${pathname === link.href ? "bg-primary font-bold text-white   hover:bg-purple-700":"text-gray-700 dark:text-white hover:bg-secondary"} hover:bg-chart-1 border capitalize   w-40 text-center py-2 rounded-md ` }>
      {link.name}
      </Link>

 ))}
      
      </aside>
      </div>
    </div>
  )
}

export default DashBoardNav