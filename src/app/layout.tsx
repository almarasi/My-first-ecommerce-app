import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NAVBAR from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import { Toaster } from "@/Components/ui/sonner";
import MySessionProvider from "../context/MySessionProvider";
import CartCountProvider from "@/context/CartCountProvider";
import WishlistCountProvider from "@/context/WishlistCountProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "A simple e-commerce application built with Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <CartCountProvider>
            <WishlistCountProvider>
              <div className="min-h-screen flex flex-col">
                <NAVBAR />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </WishlistCountProvider>
          </CartCountProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
