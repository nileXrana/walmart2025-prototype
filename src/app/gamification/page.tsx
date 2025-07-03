"use client";
import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Local trophy images for each league
const leagues = [
  { name: 'Bronze', min: 500, color: 'from-yellow-700 to-yellow-500', reward: '₹500 Walmart Coupon', trophy: '/trophies/bronze.png' },
  { name: 'Silver', min: 1000, color: 'from-gray-400 to-gray-200', reward: '₹1000 Walmart Coupon', trophy: '/trophies/silver.png' },
  { name: 'Gold', min: 2000, color: 'from-yellow-400 to-yellow-200', reward: '₹2000 Walmart Coupon', trophy: '/trophies/trophy.png' },
  { name: 'Platinum', min: 3500, color: 'from-blue-300 to-blue-100', reward: 'Walmart Merchandise', trophy: '/trophies/medal2--v2.png' },
  { name: 'Diamond', min: 5000, color: 'from-blue-600 to-blue-300', reward: 'Exclusive Walmart Merchandise', trophy: '/trophies/diamond.png' },
];

export default function GamificationPage() {
  const { user, walCoins } = useUser();
  const router = useRouter();

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  // Find current league
  const currentLeague = leagues.reduce((acc, league) => walCoins >= league.min ? league : acc, leagues[0]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-400 via-yellow-200 to-blue-100 opacity-90" />
      {/* Floating sparkles */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/70 blur-[2px] animate-sparkle`}
            style={{
              width: `${8 + Math.random() * 12}px`,
              height: `${8 + Math.random() * 12}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      <div className="bg-white/90 p-4 rounded-3xl shadow-2xl w-full max-w-xl text-center z-10 relative border-4 border-blue-100 backdrop-blur-xl">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-3 drop-shadow animate-fadein">WalCoins Gamification</h1>
        {/* Trophy for current league */}
        <div className="flex flex-col items-center mb-8 animate-fadein2">
          <div className="relative">
            <Image src={currentLeague.trophy} alt="Trophy" width={100} height={100} className="drop-shadow-2xl scale-110 animate-trophy-glow" />
            <span className={`scale-115 absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white text-sm font-bold bg-gradient-to-r ${currentLeague.color} shadow-lg border-2 border-white/60`}>{currentLeague.name} League</span>
          </div>
          <div className="text-4xl font-extrabold text-yellow-400 drop-shadow mt-6 ">{walCoins}</div>
          <div className="text-lg text-gray-700">Your WalCoins</div>
        </div>
        {/* League system */}
        <div className="mb-10 flex flex-wrap justify-center gap-8">
          {leagues.map((league) => (
            <div
              key={league.name}
              className={`flex flex-col h-[140px] items-center p-5 rounded-3xl shadow-xl bg-gradient-to-br ${league.color} transition-transform transform hover:scale-110 hover:shadow-2xl border-4 ${walCoins >= league.min ? 'border-yellow-400' : 'border-transparent'} relative animate-fadein3`}
              style={{ minWidth: 100, }}
            >
              <Image src={league.trophy} alt="Trophy" width={56} height={56} className="mb-2 drop-shadow-lg animate-trophy-glow" />
              <span className="font-bold text-lg text-white drop-shadow">{league.name}</span>
              <span className="text-xs text-white/80">{league.min}+</span>
              {walCoins >= league.min && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full shadow animate-pulse">Current</span>
              )}
            </div>
          ))}
        </div>
        {/* Rewards */}
        <div className="bg-blue-50/100 rounded-2xl p-6 mt-4 shadow-inner animate-fadein4">
          <h3 className="font-semibold mb-3 text-blue-700 text-xl">League Reward</h3>
          <ul className="text-left flex flex-col gap-2">
            {leagues.map((league) => (
              <li key={league.name} className="flex items-center gap-3 text-black">
                <Image src={league.trophy} alt="Trophy" width={32} height={32} className="animate-trophy-glow" />
                <span className={`font-bold text-black px-3 py-1 rounded-lg shadow ${walCoins >= league.min ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 'bg-gray-400'}`}>{league.name}</span>: {league.reward}
              </li>
            ))}
          </ul>
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
          0%, 100% { filter: drop-shadow(0 0 16px #ffe066) brightness(1.1); }
          50% { filter: drop-shadow(0 0 32px #ffe066) brightness(1.3); }
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
          50% { transform: translateY(-18px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite;
        }
      `}</style>
    </div>
  );
} 