import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth.provider";
import { UserButton } from "@/components/auth/user-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InsightScribe",
  description: "Gere conteúdo com IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900 text-gray-200`}>
        <AuthProvider>
          <nav className="w-full p-4 flex justify-end">
            <UserButton />
          </nav>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
