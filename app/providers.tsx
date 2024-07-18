"use client";

import type { Session } from "next-auth";
import type { ThemeProviderProps } from "next-themes/dist/types";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session?: Session | null;
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function Providers({ children, themeProps, session }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <NextUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </NextUIProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
