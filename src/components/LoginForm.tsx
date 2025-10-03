"use client";

import TextInput from "./TextInput";
import { login } from "@/app/auth/actions";
import { useSessionStore } from "@/stores/sessionStore";
import { useEffect, useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

const LoginForm = () => {
  // 1. Use the useFormState hook to manage the action's response
  const [state, formAction] = useActionState(login, null);

  // 2. Get the setSession action from your Zustand store
  const { setSession } = useSessionStore();

  // 3. Use useEffect to react to the state returned by the server action
  useEffect(() => {
    // Check if the login was successful and session data was returned
    if (state?.session) {
      console.log("Login successful on client, updating Zustand store...");
      // Update the client-side Zustand store with the returned data
      setSession(state.session);
      redirect("/dashboard"); // Redirect on success
    }
  }, [state, setSession]); // Rerun when the 'state' from the action changes

  return (
    <form
      action={formAction}
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-8 md:px-32 bg-background rounded-r-2xl overflow-hidden"
    >
      <h1 className="font-bold text-4xl">Masuk</h1>
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
          className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary"
        >
          Masuk
        </button>

        {/* Redirect to login */}
        <p>
          Belum memiliki akun?{" "}
          <Link href="/auth/register" className="text-primary underline">
            Daftar sekarang
          </Link>
        </p>
        <div className="w-full flex flex-row gap-2 items-center">
          <span className="w-full h-[1px] bg-gray-400" />
          <p className="text-gray-400">Or</p>
          <span className="w-full h-[1px] bg-gray-400" />
        </div>
        {/* Google sign up button */}
        <button className="cursor-pointer flex flex-row justify-center items-center gap-2  bg-white w-full text-foreground px-4 py-2 rounded-md outline-2 -outline-offset-2 outline-gray-400 transition-all hover:bg-gray-100">
          <Image
            src="/assets/google-g-logo.svg"
            alt="Google G Logo"
            width={24}
            height={24}
          />
          Masuk dengan Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
