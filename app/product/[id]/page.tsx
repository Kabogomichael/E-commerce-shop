"use client"
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  Carousel,
} from "../../../components/ui/carousel";
import { toast } from "sonner";
import  { Items } from "@/components/Products";
import { useCart } from "@/context/CartProvider";
import { useRouter } from "next/navigation";

// export interface Items{
//     id:string,
//     name:string,
//     price:number
//     main_image:string
//     images:string[]
// }
function ProductId({params}: {params:Promise<{id: string }>} ) {
  const [product, setProduct] = useState<Items|null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const cart = useCart()
  const router = useRouter()
  
  useEffect(()=>{
    const fetchProduct = async()=>{
 const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id",(await params).id)
    .single();
  if (error) {
    toast.error(error.message)
  }

  setIsLoading(true)
  setProduct(data)
    }
    setIsLoading(false)
   fetchProduct()

  },[])

if (!isLoading) return (<h1>Loading product...</h1>)
  const addItem = async(product:Items) => {
    const {data:{user}} = await supabase.auth.getUser()
    if (!user) {
      toast("❌ Your must logged in to add cart ")
      router.push("/logIn")
      return
      
    }
    // toast("add button under maintenance");
    const products = cart?.addToCart(product)
    toast.success("❎ item added ")
    return products
  };
  // const image = product.map((img)=> img.images)
  // const nam = product.map((name)=>name.name)
  // const product = data;
  // const singleImg = product?.map((image)=>image.images.map((img)=> img))

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mx-8 md:mx-20  my-8">
        <div className=" flex flex-col items-center justify-center md:w-150   md:ml-8 ml-4  ">
          <Carousel>
            <CarouselContent className=" rounded-2xl">
              {product?.images?.map((imag: string, i: number) => (
                <CarouselItem key={i}>
                  {" "}
                  <Image
                    src={imag}
                    alt="small image"
                    width={600}
                    height={600}
                    className="rounded outline object-cover"
                    priority
                  />{" "}
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <Image
          src={product.main_image}
          alt={product.name}
          width={600}
          height={600}
          priority
          className="object-cover" 
        /> */}

          <div className={`flex gap-4 justify-center my-4 } `}>
            {product?.images.map((imag: string, i: number) => (
              <div key={i} className="">
                {" "}
                <Image
                  src={imag}
                  alt="small image"
                  width={600}
                  height={600}
                  className=" rounded-xl border object-cover"
                  priority
                />{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-b">
            <h1 className=" text-xl md:text-5xl font-bold mb-2">
              {product?.name}
            </h1>

            <p className="w-25 rounded-2xl bg-blue-500 text-center py-1  mb-6  text-white">
              {" "}
              $ {product?.price} USD
            </p>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-lg uppercase">color</h4>
            <div className="flex gap-4 mb-6">
              <h1 className="border  px-4  py-1 rounded-2xl border-blue-400">
                Bue
              </h1>
              <h1 className="border  px-4  py-1 rounded-2xl border-red-400">
                red
              </h1>
              <h1 className="border  px-4  py-1 rounded-2xl border-blue-400">
                green
              </h1>
            </div>
          </div>
          <div className="space-y-3 ">
            <h4 className="text-lg uppercase">size</h4>
            <div className="grid grid-cols-4 gap-2">
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">xs</h1>
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">s</h1>
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">m</h1>
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">l</h1>
              <h1 className="border  px-4  py-1 rounded-2xl  uppercase">xl</h1>
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">xxl</h1>
              <h1 className="border  px-4  py-1 rounded-2xl uppercase ">
                xxxl
              </h1>
            </div>
          </div>

          <p className="text-chart-2 text-sm">
            60% combed ringspun cotton/40% polyester jersey tee.
          </p>
          <Button variant={"default"} className="  capitalize w-full" onClick={()=>  product && addItem(product)}>
            add to cart
            {/* {isLoadi ? (<h1>Add to cart</h1>) : (<h1>cart added</h1>)} */}
          </Button>
        </div>
      </div>
      <div className="ml-6">
        <h2 className="text-3xl font-bold pb-8 border-b capitalize">You may like</h2>
        
      </div>
    </div>
  );
}

export default ProductId;
