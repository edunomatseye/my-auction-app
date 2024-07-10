"use client";

import type { Session } from "next-auth";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session?: Session;
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

// import type { AppProps } from "next/app"
// import { SessionProvider } from "next-auth/react"

// export default function MyApp({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />;
//     </SessionProvider>
//   )
// }
