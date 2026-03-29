import Link from "next/link";
import { TextAlignStart } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ModeToggle } from "../theme/ThemeToggle";

function NavBar() {
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
      title: "signIn",
      link: "/signIn",
    },
    {
      title: "dashboard",
      link: "/dashboard",
    },
  ];
  return (
    <nav className="h-20 bg-gray-100 border-b ">

        <ModeToggle />
      <DropdownMenu>
        {" "}
        <DropdownMenuTrigger>
          {" "}
          <Button size={"icon-lg"} variant={"outline"}>
            {" "}
            <TextAlignStart />{" "}
          </Button>
        </DropdownMenuTrigger>{" "}
        <DropdownMenuContent>
          {" "}
          {links.map((link) => (
            <DropdownMenuItem key={link.link}>
              <Link href={link.link} className="capitalize">
                {" "}
                {link.title}
              </Link>{" "}
            </DropdownMenuItem>
          ))}{" "}
        </DropdownMenuContent>{" "}
      </DropdownMenu>
    </nav>
  );
}

export default NavBar;
