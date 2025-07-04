"use client";
import Link from 'next/link';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

// Dummy data for visits and items
const visits = [
  { date: '2025-07-15', items: ['Walmart Juice', 'Bananas'] },
  { date: '2025-04-03', items: ['Walmart Coffee', 'Cookies'] },
  { date: '2024-06-01', items: ['Walmart Milk 1L', 'Bread'] },
  { date: '2024-05-20', items: ['Eggs', 'Butter'] },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function ProfilePage() {
  const { user, walCoins } = useUser();
  const router = useRouter();

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  // Sparkle state for hydration-safe rendering
  const [sparkles, setSparkles] = useState<{width:number;height:number;left:number;top:number;animationDelay:number;}[]>([]);
  useEffect(() => {
    const newSparkles = Array.from({ length: 12 }).map(() => ({
      width: 10 + Math.random() * 14,
      height: 10 + Math.random() * 14,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 4,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-purple-400 via-blue-200 to-yellow-100 opacity-90" />
      {/* Floating sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70 blur-[2px] animate-sparkle"
            style={{
              width: `${sparkle.width}px`,
              height: `${sparkle.height}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.animationDelay}s`,
            }}
          />
        ))}
      </div>
      <div className="bg-white/80 p-8 rounded-3xl shadow-2xl w-full max-w-xl text-center z-10 relative border-4 border-purple-200 backdrop-blur-xl animate-fadein">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4 drop-shadow animate-fadein2">My Profile</h1>
        {/* User avatar */}
        <div className="flex flex-col items-center mb-6 animate-fadein3">
          <div className="relative mb-2">
            <Image src="/trophies/shield.png" alt="Profile" width={90} height={90} className="rounded-full border-4 border-purple-300 shadow-xl bg-white animate-trophy-glow" />
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg border-2 border-white/60">User_XR</span>
          </div>
          <div className="text-gray-700 mt-3 text-lg">Mobile: <span className="font-semibold text-purple-700">{user?.mobile}</span></div>
        </div>
        {/* Timeline of visits */}
        <div className="mb-8 animate-fadein4">
          <h2 className="font-semibold text-lg mb-4 text-purple-700">Store Visits</h2>
          <div className="flex flex-col items-center">
            <div className="w-1 bg-purple-200 h-32 absolute left-1/2 -translate-x-1/2 z-0" style={{top: '220px'}} />
            <ul className="relative z-10 w-full flex flex-col items-center gap-4">
              {visits.map((visit, idx) => (
                <li key={idx} className="flex flex-col items-center bg-white/90 rounded-xl px-6 py-3 shadow border-2 border-purple-100 w-3/4">
                  <span className="font-bold text-purple-700 mb-1">{formatDate(visit.date)}</span>
                  <span className="text-gray-700">{visit.items.join(', ')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* WalCoins section */}
        <div className="flex items-center justify-center gap-4 mt-6 animate-fadein4">
          <div className="font-semibold text-lg text-purple-700">WalCoins</div>
          <Link href="/gamification">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-2xl px-6 py-2 rounded-full shadow-lg border-2 border-yellow-300 cursor-pointer hover:scale-110 transition-transform animate-bounce-slow">{walCoins}</span>
          </Link>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease-in-out infinite;
        }
        @keyframes sparkle {
          0% { opacity: 0.7; transform: scale(1) translateY(0); }
          50% { opacity: 1; transform: scale(1.3) translateY(-10px); }
          100% { opacity: 0.7; transform: scale(1) translateY(0); }
        }
        .animate-sparkle {
          animation: sparkle 3.5s infinite;
        }
        @keyframes trophy-glow {
          0%, 100% { filter: drop-shadow(0 0 16px #b794f4) brightness(1.1); }
          50% { filter: drop-shadow(0 0 32px #b794f4) brightness(1.3); }
        }
        .animate-trophy-glow {
          animation: trophy-glow 2.5s infinite;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 0.8s 0.1s both; }
        .animate-fadein2 { animation: fadein 1.2s 0.3s both; }
        .animate-fadein3 { animation: fadein 1.5s 0.5s both; }
        .animate-fadein4 { animation: fadein 1.8s 0.7s both; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
    </div>
  );
} 