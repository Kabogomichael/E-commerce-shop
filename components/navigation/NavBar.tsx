"use client";
import Link from "next/link";
import { TextAlignStart, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/ThemeToggle";
import SearchInput from "../SearchInput";
import UserAvatar from "../UserAvatar";
import { LogOut } from "../authUI/LogOut";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartProvider";
import CartPage from "../CartPage";
import { motion } from "framer-motion";

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const cart = useCart();
  const [openCart, setOpenCart] = useState(false);
  const links = [
    {
      title: "home",
      link: "/",
    },
    {
      title: "logIn",
      link: "/logIn",
    },
    {
      title: "dashboard",
      link: "/dashboard",
    },
  ];
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/logIn");
  };

  if (openCart) {
    return <CartPage setOpenCart={setOpenCart} carts={cart?.cart} />;
  }
  return (
    <div className="relative">
      <motion.nav  initial={{opacity:5,y:10}} animate={{opacity:10,y:0}} transition={{duration:0.5}} className=" md:h-20 h-40 border-b flex flex-col md:flex-row py-2 md:py-9 mx-6 md:mx-0 space-y-4 md:items-center  md:justify-around ">
        <div>
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={10}
              className="object-cover"
            />
          </Link>

          {/* <UserAvatar /> */}
        </div>

        <div>
          <SearchInput />
        </div>

        <div className="flex gap-2 ">
          <AnimatePresence>
          <div className="relative  ">
            <Button variant={"outline"} onClick={() => setOpenCart(true)}>
              <ShoppingCart />
            </Button>
            <div className="bg-primary w-5 h-5 absolute z-10  bottom-5 left-5  rounded-full flex justify-center items-center">
              <p className="font-light text-white text-sm">
                {cart?.cart?.length}
              </p>
            </div>
          </div>
          </AnimatePresence>

          <div>
            <ModeToggle />
          </div>
          <div>
          <AnimatePresence>
            <DropdownMenu>
              {" "}
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"}>
                  <TextAlignStart />
                  <UserAvatar />
                </Button>
              </DropdownMenuTrigger>{" "}
              <DropdownMenuContent>
                {" "}
                {links.map((link) => (
                  <DropdownMenuItem key={link.link}>
                    <Link
                      href={link.link}
                      className={`capitalize ${
                        pathname === link.link ? "text-primary font-bold" : ""
                      }`}
                    >
                      {" "}
                      {link.title}
                    </Link>{" "}
                  </DropdownMenuItem>
                ))}{" "}
                <DropdownMenuSeparator />
                <Button
                  onClick={handleLogout}
                  variant={"ghost"}
                  className="text-red-500"
                >
                  LogOut
                </Button>
              </DropdownMenuContent>{" "}
            </DropdownMenu>
            </AnimatePresence>
          </div>
        </div>
        {/* <div className="block md:hidden">
        <SearchInput />
      </div> */}
      </motion.nav>
    </div>
  );
}

export default NavBar;
