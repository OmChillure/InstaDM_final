"use client"

import { useRouter } from "next/navigation";
import React from "react";

const Landing = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen w-screen">
      <h1 className="text-4xl font-bold">
        Welcome to web part of Insta Dm project
      </h1>

      <button onClick={()=>{router.push("/dashboard")}}>Login</button>
    </div>
  );
};

export default Landing;
