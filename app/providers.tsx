"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import * as React from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <ReactQueryProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  );
}
