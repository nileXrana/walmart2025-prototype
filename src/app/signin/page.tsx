"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

// Sign In page for user authentication
export default function SignInPage() {
  const { user, signIn } = useUser();
  const router = useRouter();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  // Redirect if already signed in
  useEffect(() => {
    if (user) router.replace('/review');
  }, [user, router]);

  // Handle sign in
  const handleSignIn = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    signIn(mobile);
    router.replace('/review');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign In to Walmart</h1>
        {/* Mobile number input */}
        <input
          type="tel"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {/* Sign In button */}
        <button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
} 