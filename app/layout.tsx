import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type React from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <nav className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                Cat Lovers
              </Link>
              <div className="space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/">Random Cats</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/breeds">Breeds</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/favorites">Favorites</Link>
                </Button>
              </div>
            </div>
          </nav>
          <main>{children}</main>
          <Toaster
            toastOptions={{
              success: {
                duration: 3500,
                style: { padding: "1rem" },
              },
              error: {
                duration: 3500,
                style: { padding: "1rem" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
import { Toaster } from "react-hot-toast";
