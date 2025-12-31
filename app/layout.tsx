import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import Link from "next/link";
import { Flex, Heading, Box } from "@chakra-ui/react";
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
        <Provider>
          <Box maxWidth="1200px" margin="auto" padding={4} >
            <Box textAlign={'center'}>
            <Link href="/" style={{ display: 'inline-block' }}>
              <Heading textAlign={'center'} fontSize={'4xl'} _hover={{ color: 'gray.500' }} mb={2} background={'white'} p={4} borderRadius={'md'} color={'black'}>Andrew Brown Blog</Heading>
            </Link>
            </Box>
            {children}
          </Box>
        </Provider>
      </body>
    </html >
  );
}
