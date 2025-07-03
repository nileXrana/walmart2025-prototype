"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

// Dummy data for visits and items
const visits = [
  { date: '2024-06-01', items: ['Walmart Milk 1L', 'Bread'] },
  { date: '2024-05-20', items: ['Eggs', 'Butter'] },
];

export default function ProfilePage() {
  const { user, walCoins } = useUser();
  const router = useRouter();

  // Redirect to sign in if not signed in
  useEffect(() => {
    if (!user) router.replace('/signin');
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">My Profile</h1>
        {/* User info */}
        <div className="mb-4 text-center">
          <div className="text-gray-700">Mobile: <span className="font-semibold">{user?.mobile}</span></div>
        </div>
        {/* Timeline of visits */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Store Visits</h2>
          <ul className="list-disc pl-5">
            {visits.map((visit, idx) => (
              <li key={idx} className="mb-1">
                <span className="font-medium">{visit.date}:</span> {visit.items.join(', ')}
              </li>
            ))}
          </ul>
        </div>
        {/* WalCoins section */}
        <div className="flex items-center justify-between">
          <div className="font-semibold">WalCoins:</div>
          <Link href="/gamification">
            <span className="text-yellow-500 font-bold text-xl cursor-pointer hover:underline">{walCoins}</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 