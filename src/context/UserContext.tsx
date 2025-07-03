"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// User session type
type User = {
  mobile: string;
};

// Context value type
interface UserContextType {
  user: User | null;
  walCoins: number;
  signIn: (mobile: string) => void;
  signOut: () => void;
  addWalCoins: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [walCoins, setWalCoins] = useState<number>(0);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedWalCoins = localStorage.getItem('walCoins');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedWalCoins) setWalCoins(Number(storedWalCoins));
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    localStorage.setItem('walCoins', String(walCoins));
  }, [user, walCoins]);

  // Sign in function
  const signIn = (mobile: string) => {
    setUser({ mobile });
    setWalCoins(100); // Give default WalCoins on sign in
  };

  // Sign out function
  const signOut = () => {
    setUser(null);
    setWalCoins(0);
  };

  // Add WalCoins
  const addWalCoins = (amount: number) => {
    setWalCoins((prev) => prev + amount);
  };

  return (
    <UserContext.Provider value={{ user, walCoins, signIn, signOut, addWalCoins }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
} 