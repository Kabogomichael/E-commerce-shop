"use client"
import Hero from "@/components/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="px-4 ">
      <Hero />
      <div className=" md:ml-20 ml-6">
        <h1 className="border-b pb-5 text-2xl capitalize">feature product</h1>
        <Products />
      </div>
    </div>
  );
}
