"use client";

import { useSessionStore } from "@/stores/sessionStore";
import Image from "next/image";

const DashboardPage = () => {
  const { clearSession } = useSessionStore();

  return (
    <div className="">
      {/* <p>Hello {accessToken}</p> */}
      <button onClick={() => clearSession()}>Logout</button>
      <Image
        className="object-cover aspect-square "
        src="/assets/auth-bg.png"
        width={150}
        height={150}
        alt="Profile Photo"
      />
    </div>
  );
};

export default DashboardPage;
