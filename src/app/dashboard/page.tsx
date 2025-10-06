"use client";

import CoursesGrid from "@/components/CoursesGrid";
import { useSessionStore } from "@/stores/sessionStore";
import Link from "next/link";

const DashboardPage = () => {
  const { clearSession } = useSessionStore();

  return (
    <div className="">
      {/* <p>Hello {accessToken}</p> */}
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <button onClick={() => clearSession()}>Logout</button>

      <CoursesGrid />
    </div>
  );
};

export default DashboardPage;
