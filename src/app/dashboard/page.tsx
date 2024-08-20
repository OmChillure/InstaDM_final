'use client'

import DashboardWrapper from "@/components/hoc/DashboardPagesWrapper";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const {data, status} = useSession()

  console.log(data,status)


  return <div>page</div>;
};

export default DashboardWrapper(Page , "Dashboard");
