"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { useSessionStore } from "@/stores/sessionStore";

// Define a return type for clarity
type LoginResponse = {
  error?: string;
  session?: {
    role: string;
    accessToken: string;
  };
};

export async function login(
  previousState: LoginResponse | null,
  formData: FormData
): Promise<LoginResponse> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const signInData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // 1. Sign in the user
  const { error } = await supabase.auth.signInWithPassword(signInData);

  if (error) {
    // Return an error object instead of redirecting here
    return { error: error.message };
  }

  // 2. Get the session data
  const { data: userData } = await supabase.auth.getUser();
  const { data: sessionData } = await supabase.auth.getSession();

  // 3. If data is valid, RETURN it. Do not call Zustand here.
  if (userData.user && sessionData.session) {
    const sessionPayload = {
      role: userData.user.role?.toString() ?? "siswa",
      accessToken: sessionData.session.access_token ?? "Token tidak dapat anj",
    };

    // Note: The redirect will happen before this return is processed by the client,
    // but it's good practice to have a return path.
    return { session: sessionPayload };
  }

  // Handle case where login succeeded but session data is missing
  return { error: "Login successful, but failed to retrieve session data." };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/");
}
