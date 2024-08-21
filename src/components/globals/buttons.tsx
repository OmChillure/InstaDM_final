"use client"

import { typoGraphy } from "@/lib/cssConfig";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

export type ButtonProps = {
  text: string;
  icon?: ReactNode;
  iconAction?: ReactNode;
  navigateTo?:string
};

export const Button01 = ({ text, icon, iconAction, navigateTo }: ButtonProps) => {
    const router = useRouter()


  return (
    <div className="flex py-5 px-4 gap-4 items-center bg-purple03 rounded-3xl cursor-pointer hover:bg-purple02" onClick={()=>{
        navigateTo && router.push(navigateTo)
    }}>
      <span className="p-3 rounded-full bg-purple04">
        {icon}
      </span>

      <span className={clsx("flex-1", typoGraphy.textBaseSB)}>{text}</span>

      <span className="p-1 rounded-full bg">{iconAction}</span>
    </div>
  );
};
