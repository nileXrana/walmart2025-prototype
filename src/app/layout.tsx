"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider, useUser } from "@/context/UserContext";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Header component for navigation and user info
function Header() {
  const { user, walCoins, signOut } = useUser();
  return (
    <header className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white py-4 px-6 flex items-center justify-between shadow-2xl border-b-4 border-yellow-300/60 z-20 relative">
      <div className="flex items-center gap-3">
        <Link href="/">
          <span className="font-extrabold text-2xl tracking-wide drop-shadow-lg cursor-pointer hover:scale-105 transition-transform">WalStore</span>
        </Link>
        <nav className="ml-8 flex gap-4 text-base">
          <Link href="/products" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-yellow-300/80 hover:text-blue-900 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 border border-transparent hover:border-yellow-400">Products</Link>
          <Link href="/review" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-yellow-300/80 hover:text-blue-900 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 border border-transparent hover:border-yellow-400">Review</Link>
          <Link href="/profile" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-yellow-300/80 hover:text-blue-900 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 border border-transparent hover:border-yellow-400">Profile</Link>
          <Link href="/gamification" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-yellow-300/80 hover:text-blue-900 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 border border-transparent hover:border-yellow-400">Gamification</Link>
          <Link href="/admin" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-yellow-300/80 hover:text-blue-900 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 border border-transparent hover:border-yellow-400">Admin</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded-full shadow-lg border-2 border-yellow-200">WalCoins: {walCoins}</span>
            <span className="text-sm font-semibold drop-shadow">{user.mobile}</span>
            <button onClick={signOut} className="ml-2 bg-white text-blue-700 font-bold px-3 py-1 rounded shadow hover:bg-yellow-100 transition cursor-pointer">Sign Out</button>
          </>
        ) : (
          <Link href="/signin" className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded shadow hover:bg-yellow-500 transition cursor-pointer">Sign In</Link>
        )}
      </div>
    </header>
  );
}

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
        <UserProvider>
          <Header />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
