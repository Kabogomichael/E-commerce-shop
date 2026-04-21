"use client";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
export interface Items {
  id: string;
  name: string;
  price: number;
  main_image: string;
  images: string[];
}

function Products() {
  const [items, setItems] = useState<Items[]>([]);

  const fetchItem = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (data) {
      setItems(data);
    }
    if (error) {
      return <h1>{error.message}</h1>;
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <div  className="mt-6  grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 mb-5 space-y-6 ">
      {items?.map((item,i) => (
        <motion.div className="border rounded-md  w-80 " key={i} initial={{opacity:0,y:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}>
        <Link
          href={`product/${item.id}`}
          
          className=""
        >
          <Image
            src={item.main_image}
            alt={item.name}
            width={400}
            height={400}
            className="object-cover"
          />
          <motion.div >

        
          <Button
            variant={"outline"}
            className="w-70 h-12 px-1 ml-2 mb-2 flex items-center justify-between rounded-full"
          >
            <h1 className="capitalize m-2">{item.name}</h1>
            <p className="bg-blue-500 w-26 h-9 rounded-full  flex items-center justify-center text-white">
              ${item.price} USD
            </p>
          </Button>
          </motion.div>
        </Link>
        </motion.div>
      ))}
     
    </div>
  );
}

export default Products;
