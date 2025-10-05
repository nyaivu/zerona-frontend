"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores/sessionStore"; // Use the updated store

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isLoggedIn, _hasHydrated } = useSessionStore();
  const router = useRouter();

  // 1. Initial check combines both factors: waiting for hydration AND checking logged status
  const isChecking = !_hasHydrated || !isLoggedIn;

  useEffect(() => {
    // 2. Only proceed if the store has finished loading its data from storage
    if (_hasHydrated) {
      if (!isLoggedIn) {
        // 3. If NOT logged in after hydration, redirect
        router.push("/auth/login");
      }
      // If loggedIn is true, no action is needed, and the component will render children
    }
    // Dependency array watches both the hydration status and the logged-in status
  }, [_hasHydrated, isLoggedIn, router]);

  // Render loading state if either hydration is not complete OR isLoggedIn is false
  // before the useEffect has a chance to run/redirect.
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Verifying session...</p>
      </div>
    );
  }

  // If _hasHydrated is true AND isLoggedIn is true, render the children
  return <>{children}</>;
};

export default AuthGuard;
