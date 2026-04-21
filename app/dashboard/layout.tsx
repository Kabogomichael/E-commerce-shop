"use client";
import DashBoardNav from "@/components/navigation/DashboardNav";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  md:flex-row flex-col overflow-scroll">
      <DashBoardNav />
      <main className=" min-h-screen w-full  pt-10 border-l md:pl-10">
        {children}
      </main>
    </div>
  );
}
