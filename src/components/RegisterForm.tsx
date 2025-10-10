// components/SignUpForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import TextInput from "@/components/TextInput";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation"; // For client-side navigation

// Define the type for the data sent to the API
interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string; // Assuming 'guru' is the default role for this form
}

// Define the type for the API response (adjust based on your Rails API)
interface RegisterResponse {
  message: string;
  user_id: number;
  email: string;
  // Your Rails API might return the user object or a simple confirmation
}

export default function SignUpForm() {
  const axiosInst = axiosInstance;
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"murid" | "guru">("murid");

  // State for form data (optional, but good for controlled inputs/validation)
  // For simplicity, we are relying on FormData API in handleSubmit for now.

  // 3. useMutation IMPLEMENTATION
  const mutation = useMutation<RegisterResponse, Error, RegisterFormData>({
    mutationFn: async (formData) => {
      // POST request to your Ruby on Rails /register endpoint
      const response = await axiosInst.post<RegisterResponse>(
        "/register",
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Registration successful!", data);

      // Redirect the user to the login page after successful registration
      router.push("/auth/login?registered=true");
    },
    onError: (error) => {
      // Display registration error (e.g., email already exists, password too short)
      console.error("Registration failed:", error.message);
      // You might want to update local state here to display a more user-friendly error
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;

    // Simple validation for password match (client-side)
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!"); // Replace with better error handling
      return;
    }

    // Construct the payload matching the required body structure
    const payload: RegisterFormData = {
      first_name: firstName,
      last_name: lastName,
      email: formData.get("email") as string,
      password: password,
      role: selectedRole,
    };

    mutation.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 md:px-32 bg-background rounded-r-2xl overflow-hidden"
    >
      <h1 className="font-bold text-4xl">Daftar Akun</h1>

      {/* Display loading/error status */}
      {mutation.isPending && <p className="text-blue-500">Mendaftarkan...</p>}
      {mutation.isError && (
        <p className="text-red-500">
          Error:{" "}
          {mutation.error.message.includes("NEXT_REDIRECT")
            ? "Redirecting..."
            : mutation.error.message}
        </p>
      )}

      <div className="w-full">
        <label
          htmlFor="role-select"
          className="text-sm font-medium text-foreground block mb-1"
        >
          Daftar sebagai
        </label>
        <select
          id="role-select"
          name="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as "murid" | "guru")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-foreground focus:ring-primary focus:border-primary transition-all"
        >
          <option value="murid">Murid (Pelajar)</option>
          <option value="guru">Guru (Pengajar)</option>
        </select>
      </div>
      <TextInput
        name="first_name"
        label="Nama pertama"
        placeholder="Masukkan nama pertama anda..."
      />
      <TextInput
        name="last_name"
        label="Nama terakhir"
        placeholder="Masukkan nama terakhir anda..."
      />
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
      <TextInput
        isPassword
        name="confirm-password"
        label="Konfirmasi password"
        placeholder="Konfirmasi ulang password anda..."
      />

      <div className="w-full flex flex-col items-center gap-4">
        {/* Submit button */}
        <button
          className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
          type="submit"
          disabled={mutation.isPending} // Disable while loading
        >
          {mutation.isPending ? "Memproses..." : "Daftar sekarang"}
        </button>

        {/* ... rest of the buttons/links ... */}
        <p>
          Sudah memiliki akun?{" "}
          <Link href="/auth/login" className="text-primary underline">
            Masuk di sini
          </Link>
        </p>
      </div>
    </form>
  );
}
