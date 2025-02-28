"use client"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export const NextAuthProviders = ({ 
  children,
  session = undefined
}: { 
  children: ReactNode,
  session?: any
}) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
} 