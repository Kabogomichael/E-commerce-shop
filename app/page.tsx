"use client";
import Hero from "@/components/Hero";
import LoadingCard from "@/components/LoadingCard";
import Products from "@/components/Products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="px-4 ">
      <Hero />
      <div className=" md:ml-20 ">
        <h1 className="border-b pb-5 text-2xl capitalize">feature product</h1>
        <Suspense fallback={<LoadingCard />}>
          <Products />
        </Suspense>
      </div>
    </div>
  );
}
