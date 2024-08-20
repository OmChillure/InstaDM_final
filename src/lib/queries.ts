'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getSession } from "next-auth/react";


export const getUserAuthDetails = async () => {
    const session = await getSession()

    console.log(session)
  
    return session;
  };