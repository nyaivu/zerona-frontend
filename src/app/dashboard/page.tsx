"use client";

import { signout } from "@/app/auth/actions";
import { useSessionStore } from "@/stores/sessionStore";

const DashboardPage = () => {
  const { accessToken } = useSessionStore();

  return (
    <div className="">
      <p>Hello {accessToken}</p>
      <button onClick={signout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
