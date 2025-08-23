import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "EZTechMovie Subscriptions and Merchandise",
  description: "A place to purchase all of your EZTechMovie needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <CartProvider>
            <div className="app-container">
              <NavBar />
              <main className="main-content">{children}</main>
              <Toaster position="top-left" reverseOrder={false} />
            </div>
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
