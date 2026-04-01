"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type SessionProviderWrapperProps = {
  children: ReactNode;
};

export function SessionProviderWrapper({
  children,
}: SessionProviderWrapperProps) {
  return <SessionProvider>{children}</SessionProvider>;
}