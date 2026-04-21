"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { CarouselContent,CarouselNext,CarouselPrevious,CarouselItem,Carousel } from './ui/carousel'
import { supabase } from '@/lib/supabase'
import { Items } from './Products'
import image1 from "@/public/images/t-shirt-1.avif"
import image2 from "@/public/images/baby-cap-black.avif"
import image3 from "@/public/images/t-shirt-color-black.avif"
import image4 from"@/public/images/hat-1.avif"
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { useCart } from '@/context/CartProvider'
import Loading from '@/app/loading'

const imageCarousel =[{id:1,image:image1},{id:1,image:image2},{id:3,image:image3},{id:4,image:image4}]


function Hero() {
    const [image, setImage] = useState<Items []>([])

    

//     useEffect( () => {
//         const fetchImage = async()=>{
//               const res =  await fetch("https://fakestoreapi.com/products?limit=6");
//           const data = await  res.json()
//             setImage(data)
//         }
//    fetchImage()

//     }, [])
const fetchImage = async()=>{
    const {data} = await supabase.from("products").select("*")
    if (data) {
        setImage(data)
    }
}

useEffect(() => {
  fetchImage()
}, [])

    
  
  return (
    <main className='mx-3 md:ml-19 mt-6  flex   md:gap-9'>
        <div className='max-w-2xl md:mt-12 space-y-6 md:space-y-16'>
            <motion.h1 initial={{opacity:1,x:0}} animate={{opacity:10,x:20}} transition={{duration:0.5}}  className='text-3xl md:text-4xl  lg:text-6xl dark:text-white/80 text-black/85 font-bold capitalize md:leading-16 '>we are changing the way people shop</motion.h1>
            <motion.p initial={{opacity:1,y:20}} animate={{opacity:9,y:0}} transition={{duration:0.9}} className=' leading-6 text-chart-2 font-serif'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</motion.p>
            <Button  className='px-8 py-5 cursor-pointer hover:scale-110 hover:bg-purple-800  transition ease-in-out duration-500'>Our Product</Button>
        </div>
        <div>
            <motion.div initial={{opacity:1,x:20}} animate={{opacity:10,x:0}} transition={{duration:0.5}} className=' w-150 ml-10  hidden md:block'>
                <Carousel plugins={[
                    Autoplay({delay:2000})
                ]}>
                    <CarouselContent className=' rounded-2xl'>
                    
                        {image.map((img,i)=>(
                            <CarouselItem key={i}  className='flex items-center justify-center object-cover'>
                            <Image src={img.main_image} alt={img.name} width={500} height={500} className='object-cover' priority />
                            </CarouselItem>
                        ))}
 
                    </CarouselContent>
                    <CarouselPrevious />
                     <CarouselNext />
                </Carousel>

            </motion.div> 
        </div>
    </main>
  )
}

export default Hero