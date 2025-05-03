import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/Authentication/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Gear",
  description: "An Ecommerce website based on technological gears",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
