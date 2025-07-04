"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import Image from "next/image";

// Sign In page for user authentication
export default function SignInPage() {
  const { user, signIn } = useUser();
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

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

  // Redirect if already signed in
  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  // Handle sign in
  const handleSignIn = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    signIn(mobile);
    router.replace('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-yellow-200 via-blue-200 to-blue-100 opacity-90" />
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
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl w-full max-w-md text-center z-10 relative border-4 border-yellow-100 backdrop-blur-xl animate-fadein">
        <div className="flex flex-col items-center mb-4 animate-fadein2">
          <Image src="/trophies/trophy.png" alt="Sign In" width={80} height={80} className="drop-shadow-2xl scale-110 animate-trophy-glow" />
        </div>
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 drop-shadow animate-fadein2">Sign In to Walmart</h1>
        {/* Mobile number input */}
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className="w-full p-4 text-black border-2 border-blue-200 rounded-2xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-inner bg-white/80 animate-fadein3 text-lg"
        />
        {error && <div className="mb-3 p-2 rounded-xl bg-red-100 text-red-700 text-base font-semibold shadow animate-fadein4">{error}</div>}
        {/* Sign In button */}
        <button
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition animate-fadein4 border-2 border-yellow-300 hover:scale-105 text-lg"
          onClick={handleSignIn}
        >
          Sign In
        </button>
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
      `}</style>
    </div>
  );
} 