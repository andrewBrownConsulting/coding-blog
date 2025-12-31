import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Box } from "@chakra-ui/react";
import Header from "./Header";
import { Provider } from "@/components/ui/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andrew Brown Blog",
  description: "A blog about web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider >
          <Box maxWidth="1200px" margin="auto" padding={4} gap={6} >
            <Header />
            <Box textAlign={'center'}>
            </Box>
            {children}
          </Box>
        </Provider>
      </body>
    </html >
  );
}
