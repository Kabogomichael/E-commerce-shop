"use client"
import React, { useState } from 'react'
import { supabase } from "../../lib/supabase"
import {Input} from "../ui/input"
import Image from "next/image"
import {Button} from "../ui/button"
import { Label } from '../ui/label'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function CreateProduct() {
    const router = useRouter()
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [mainPreview, setMainPreview] = useState<string | null>(null);
    const [extraPreview, setExtraPreview] = useState<string[]>([]);
    const [mainFile, setMainFile] = useState<File | null>(null);
    const [extraFiles, setExtraFiles] = useState<File[]>([]);
    const [addingProduct, setAddingProduct] = useState(false)
    
    // upoading images 
    const upLoadImage = async(file:File ):Promise<string | null>=>{
        const fileName = `${Date.now()}-${file.name}`

       
        const{error} = await supabase.storage.from("products").upload(fileName,file)
        if (error) {
            console.log("upload error",error);
            return null
            
        }
        const {data} = supabase.storage.from("products").getPublicUrl(fileName)
        return data.publicUrl;
    
    }


    const handleImageUpload = async(e:React.FormEvent)=>{
        e.preventDefault()
        try {
            if (!mainFile) {
                toast("please select an image")
                return
            }
            const mainImageUrl = await upLoadImage(mainFile)
            

             // upload extraimages
            const imageUrls:string[] = []
            for (let file of extraFiles) {
                const url =  await upLoadImage(file)
                if (url) imageUrls.push(url) 
                
            }
if (imageUrls.length < 3) {
    toast("Please upload at least 3 extra images")
    return
    
}
            const {error} = await supabase.from("products").insert([{
                name,
                price:Number(price),
                main_image:mainImageUrl,
                images:imageUrls,
            }])
                
            if (error) throw error;
            setAddingProduct(true)
            toast("✅ Product added successfully!");
            setName("");
            setPrice("");
            setMainFile(null);
            setExtraFiles([]);
            setMainPreview(null);
            setExtraPreview([]);
            router.push("/dashboard")


           
        } catch (error) {
            console.error("FULL ERROR:", error);
            toast.error("Something failed");
        }

    }
  return (
    <div className="  flex flex-row justify-center  items-center  "> 
    <div className='p-8 rounded-2xl shadow-md border ml-10 '>
    <h1 className='mb-5 text-3xl font-bold capitalize text-center'>Add product</h1>
    

        <form onSubmit={handleImageUpload} className='w-full max-w-md space-y-6  ' >
            <div>
                    <p className='capitalize '>name</p>
                <Input type='text' value={name} onChange={(e)=> setName(e.target.value)} placeholder='Create name'   />
            </div>
            <div>
                 <p className='capitalize '>price</p> 
                <Input type='number' value={price} onChange={(e)=> setPrice(Number(e.target.value))} placeholder='Create price' />
            
            </div>
            
           
              
            
            <div>
                <p className='capitalize '>main image</p>
                 <Input type='file' onChange={(e)=>{
                const files = e.target.files?.[0];
                if (!files )return;
                setMainFile(files)
                setMainPreview(URL.createObjectURL(files))
            } 
            } />

            {mainPreview && (
                <Image src={mainPreview} alt='main image' width={20} height={20} className="mt-2 object-cover rounded-lg"  unoptimized />
            )}
            </div>
           <div>

            <p className='capitalize '>Extra images</p>
            <Input type='file' multiple={true} onChange={(e)=>{
                const files = e.target.files;
                console.log(files);
                
                if (!files) return;
                const arry = Array.from(files)

                 setExtraFiles((prev)=> [...prev,...arry])
                 setExtraPreview((prev)=> [...prev,...arry.map((file)=> URL.createObjectURL(file) )])
                }
            } />

            
                {extraPreview.map((img,i)=>(
                  <Image key={i}  src={img}  alt='extra image' width={20} height={20} className="mt-2 object-cover rounded-lg block"  unoptimized/>    
                    ))
}
                
           </div>
           <Button type='submit' className='w-full cursor-pointer'>{addingProduct? "adding...":"Add product"}</Button>
        </form>
        </div>
    </div>
  )
}

export default CreateProduct;