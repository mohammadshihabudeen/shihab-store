import { UserProvider } from "@/context/UserContext";
import { ProductProvider } from "@/context/ProductContext";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "A Next.js 15 app with authentication and product management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <UserProvider>
            <ProductProvider>
              <Navbar />
              <main className="container mx-auto p-4">{children}</main>
            </ProductProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
