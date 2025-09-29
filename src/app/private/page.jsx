import { redirect } from "next/navigation";
import { signout } from "@/app/auth/actions";

import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="">
      <p>Hello {data.user.email}</p>
      <button onClick={signout}>Logout</button>
    </div>
  );
}
