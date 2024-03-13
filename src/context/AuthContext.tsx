"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type AuthContextProps = {
  children: ReactNode;
};

const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
