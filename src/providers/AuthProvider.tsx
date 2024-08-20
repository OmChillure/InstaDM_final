'use client'

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  session?: Session;
};

const AuthProvider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
