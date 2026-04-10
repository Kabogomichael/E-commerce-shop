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
import Autoplay from 'embla-carousel-autoplay'
import { useCart } from '@/context/CartProvider'

const imageCarousel =[{id:1,image:image1},{id:1,image:image2},{id:3,image:image3}]


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
const images  = image.map((img)=> img.main_image)
}

    
  
  return (
    <main className='ml-6 md:ml-19 mt-6  flex   md:gap-9'>
        <div className='max-w-2xl md:mt-12 space-y-6 md:space-y-16'>
            <h1 className='text-3xl md:text-4xl  lg:text-6xl dark:text-chart-1 font-bold capitalize md:leading-16 '>we are changing the way people shop</h1>
            <p className=' leading-6 text-chart-2 font-serif'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
            <Button  className='px-8 py-5 cursor-pointer'>Our Product</Button>
        </div>
        <div>
            <div className=' w-150 ml-10  hidden md:block'>
                <Carousel plugins={[
                    Autoplay({delay:2000})
                ]}>
                    <CarouselContent className=' rounded-2xl'>
                    
                        {imageCarousel.map((img,i)=>(
                            <CarouselItem key={i}  className='flex items-center justify-center object-cover'>
                            <Image src={img.image} alt="image1" width={500} height={500} />
                            </CarouselItem>
                        ))}
 
                    </CarouselContent>
                    <CarouselPrevious/>
                     <CarouselNext/>
                </Carousel>

            </div> 
        </div>
    </main>
  )
}

export default Hero