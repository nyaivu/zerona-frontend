// components/SignInForm.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import TextInput from "@/components/TextInput";
import { axiosInstance } from "@/utils/axios"; // Assuming this is client-side ready
import { useSessionStore } from "@/stores/sessionStore";
import { useRouter } from "next/navigation";

// Define the type for the form data
interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  // You can add other user properties here if they exist in your actual response
}

// Define the structure for the complete successful login response
interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export default function LoginForm() {
  const axiosInst = axiosInstance;
  const { setSession } = useSessionStore();
  const router = useRouter();

  // 1. CREATE THE TYPED useMutation FUNCTION
  const mutation = useMutation<LoginResponse, Error, LoginFormData>({
    // mutationFn takes the variables (formData) and returns the API call
    mutationFn: async (formData) => {
      const response = await axiosInst.post<LoginResponse>("/login", formData);
      return response.data; // Return the response data
    },
    onSuccess: (data) => {
      // Handle successful login (e.g., store token, redirect, show success message)
      console.log("Login successful! Data:", data);
      // Example: window.location.href = '/dashboard';
      setSession({
        accessToken: data.token,
        role: data.user.role,
      });

      router.push("/dashboard");
    },
    onError: (error) => {
      // Handle errors (e.g., show error message to user)
      console.error("Login failed:", error.message);
      // Example: alert(`Login Error: ${error.message}`);
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Call the mutation function with the form data
    mutation.mutate({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 md:px-32 bg-background rounded-r-2xl overflow-hidden"
    >
      <h1 className="font-bold text-4xl">Masuk</h1>
      {/* Show loading state or error message */}
      {mutation.isPending && <p className="text-blue-500">Logging in...</p>}
      {mutation.isError && (
        <p className="text-red-500">Error: {mutation.error.message}</p>
      )}

      <TextInput
        name="email"
        label="Email"
        placeholder="Masukkan email anda..."
      />
      <TextInput
        isPassword
        name="password"
        label="Password"
        placeholder="Masukkan password anda..."
      />

      <div className="w-full flex flex-col items-center gap-4">
        {/* Submit button */}
        <button
          type="submit"
          disabled={mutation.isPending} // Disable button while loading
          className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
        >
          {mutation.isPending ? "Memproses..." : "Masuk"}
        </button>

        {/* Redirect to login */}
        <p>
          Belum memiliki akun?{" "}
          <Link href="/auth/register" className="text-primary underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </form>
  );
}
