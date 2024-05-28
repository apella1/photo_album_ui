import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryClientProvider from "@/components/ReactQueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Album",
  description: "Photo Album for storing user photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <AppRouterCacheProvider>
          <body className={`${inter.className} bg-blue-500 text-white`}>
            {children}
          </body>
        </AppRouterCacheProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </html>
    </ReactQueryClientProvider>
  );
}
