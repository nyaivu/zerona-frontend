// pages/auth/signup/page.tsx (or wherever your page is located)
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
// Import the new Client Component
import SignUpForm from "@/components/RegisterForm";
import React from "react";

const SignUpPage: NextPage = () => {
  return (
    <div className="md:grid grid-cols-2">
      {/* 1. Render the Client Component */}
      <SignUpForm />

      {/* 2. Background image (can remain a Server Component part) */}
      <div className="hidden md:block w-auto h-screen -z-10 -ml-4">
        <Image
          className="w-full h-full object-cover "
          src="/assets/auth-bg.png"
          alt="Latar belakang autentikasi"
          width={754}
          height={1024}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
