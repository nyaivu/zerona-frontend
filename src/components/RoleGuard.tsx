"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../stores/sessionStore";
import { ReactNode } from "react";

interface RoleGuardProps {
  allowedRole: string;
  children: ReactNode;
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const { role } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect if the role is loaded and doesn't match the allowed role
    if (role && role !== allowedRole) {
      router.push("/dashboard");
    }
  }, [role, allowedRole, router]);

  // Only render the children if the role matches
  if (role === allowedRole) {
    return <>{children}</>;
  }

  // Render nothing (or a loading spinner) while checking the role
  // This prevents the protected content from flashing on the screen
  return null;
}
