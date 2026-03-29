"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { redirect, useRouter } from "next/navigation";

function CreateAccount() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 character");
      return;
    }

    const {data,error,} = await supabase.auth.signUp({ email, password ,options:{data:{
      full_name:fullName
    }}});
    if (data.session) {
      router.push("/dashboard")
    }
    if (data.user) {
     const{error} = await supabase.from("users").insert([
        {
          id: data.user.id,
          full_name:fullName,
          email: data.user.email,
          is_active:true,
          last_seen: new Date()
        },
      ]);
      if (error) {
        toast(error.message)
      }
    }
    if (error) {
      toast(error.message);
    }
    //  toast("Account created ",{position:"top-right"})
    toast("signUp successful", { position: "top-left" });
    // router.push("/");
  };
  return (
    <div className=" min-h-screen flex items-center justify-center ">
      <div className="p-8 rounded-2xl shadow-md w-full max-w-md border dark:bg-chart-4">
        <h1 className="text-center text-2xl mb-6 font-bold capitalize">
          {" "}
          create account
        </h1>
        <form className="space-y-4 w-full " onSubmit={(e) => handleSubmit(e)}>
          <div>
            <Label>Full name</Label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="full name"
              className="w-full  mt-2"
              required
            />
          </div>
          <div>
            <Label> Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email"
              className="w-full mt-2"
              required
            />
          </div>

          <div>
            <Label> Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full mt-2"
              required
            />
            <p className="text-xs text-red-500 ">{error}</p>
          </div>
          <div>
            <Label> Confirm password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="w-full mt-2"
              required
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Create account
          </Button>

          <p className="text-sm ">
            {" "}
            I already have an account?
            <Link href={"/logIn"} className="underline text-blue-600 ml-1">
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
