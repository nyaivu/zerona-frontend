"use client";

import CoursesGrid from "@/components/CoursesGrid";
import MyCoursesGrid from "@/components/MyCoursesGrid";
import { useSessionStore } from "@/stores/sessionStore";

const DashboardPage = () => {
  const { role } = useSessionStore();

  return (
    <div className="">
      {/* <p>Hello {accessToken}</p> */}
      <section className="px-4 py-2">
        <h1 className="font-bold text-3xl">Dashboard</h1>
        <p className="text-lg">Selamat datang, anda masuk sebagai {role}.</p>
      </section>

      <CoursesGrid />
      <MyCoursesGrid />
    </div>
  );
};

export default DashboardPage;
