import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Authentication/AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/components/TanstackProvider/TanstackProvider";
import { CartProvider } from "@/components/Provider/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Gear",
  description: "An Ecommerce website based on technological gears",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <TanstackProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
