"use client"
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Items } from "./Products";
import Image from "next/image";
interface CartPage {
  setOpenCart: () => Boolean;
  carts: Items[];
}

function CartPage({ setOpenCart, carts }: CartPage) {
    const [cartItems, setCartItems] = useState(1)
    const IncreaseCart =()=>{
        setCartItems(cartItems + 1)
    }
    const DecreaseCart =()=>{
        setCartItems(cartItems - 1)
    }
  return (
    <div className="absolute z-50  bg-black/50 transition-colors  w-full h-full top-0">
      <div className="flex justify-end">
        <div className="w-xl bg-card min-h-screen ">
          <div className="flex justify-end mr-4 mt-2">
            <Button
              variant={"outline"}
              size={"icon-sm"}
              onClick={() => setOpenCart(false)}
            >
              x
            </Button>
          </div>
          {carts.length === 0 ? (
            <div className="text-center text-2xl text-chart-2">No item in cart</div>
          ) : (
            <div>
              {carts.map((cart) => (
                <div key={cart.id} className={`flex items-center `}>
                  <Image
                    src={cart.main_image}
                    alt={cart.name}
                    width={100}
                    height={100}
                  />
                  <h1>{cart.name}</h1>
                    <p>{cart.price}</p>
                  <div className="flex items-center ml-4 gap-4">
                    <Button onClick={DecreaseCart}>-</Button>
                  <h1>{cartItems}</h1>
                    <Button onClick={IncreaseCart}>+</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
