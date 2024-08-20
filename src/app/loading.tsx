import Image from "next/image";
import React from "react";
import loader from "@/../../public/loader.svg";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image src={loader} width={40} height={40} alt="loading..." className="animate-spin"/>
    </div>
  );
};

export default loading;
