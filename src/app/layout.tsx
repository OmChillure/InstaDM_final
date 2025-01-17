import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./StoreProvider"
import DialogWrapper from "@/components/hoc/DialogWrapper";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Insta DM",
  description: "Send dms on insta",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <StoreProvider>
          <body className={poppins.className}>
            <main>{children}</main>
            <DialogWrapper />
            <Toaster />
          </body>
        </StoreProvider>
      </AuthProvider>
    </html>
  );
}
