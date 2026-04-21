// "use client"
import { Items } from "@/components/Products";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { supabase } from "@/lib/supabase";
import Image from "next/image";
import React, { useState } from "react";

async function DashBoard() {
  const { data } = await supabase.from("products").select("*");

  if (!data) {
    return (
      <h1 className="text-center text-3xl font-bold text-chart-2 capitalize">
        No products found !
      </h1>
    );
  }
  return (
    <Table className="w-200 md:w-full">
      <TableCaption>Product added by the admin</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Image1</TableHead>
          <TableHead>Image2</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      {data?.map((item: Items) => (
        <TableBody key={item.id}>
          <TableRow>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>
              <Image
                src={item.main_image}
                alt={item.name}
                width={40}
                height={40}
                priority
              />
            </TableCell>
            <TableCell className="flex gap-2">
              {item.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  width={40}
                  height={40}
                  alt="image2"
                  priority
                />
              ))}
            </TableCell>
            <TableCell>
              <Button variant={"destructive"}>Delete</Button>{" "}
              <Button>Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
}

export default DashBoard;
