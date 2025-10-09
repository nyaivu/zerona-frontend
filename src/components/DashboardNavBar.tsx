"use client";

import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { useSessionStore } from "@/stores/sessionStore";

const DashboardNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearSession } = useSessionStore();

  return (
    <nav className="sticky top-0 inset-x-0 flex flex-row justify-between items-center px-4 py-2 z-50 bg-background">
      <div className="font-medium font-serif">
        <Link href="/">
          <p>KelasIn</p>
        </Link>
      </div>

      <ul
        className={`hidden origin-top w-full sm:flex flex-row items-center justify-end z-40 text-foreground gap-4 bg-background rounded-b-lg transition-all duration-300`}
      >
        <li>
          <Link
            className="w-full flex flex-row items-center gap-2"
            href="/dashboard"
          >
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/courses"
          >
            <p>Kursus</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/students"
          >
            <p>Murid</p>
          </Link>
        </li>
        <li>
          <button onClick={() => clearSession()}>Logout</button>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <Hamburger
          rounded
          toggled={isOpen}
          toggle={setIsOpen}
          size={24}
          color="#1f2937"
        />
      </div>
      {/* <div className=""> */}
      <ul
        style={{
          transform: isOpen ? "scaleY(100%)" : "scaleY(0)",
        }}
        className={`fixed inset-x-0 top-12 h-auto sm:hidden sm:h-0 origin-top w-full flex flex-col items-start justify-center z-40 text-lg text-foreground gap-2 p-4 bg-background rounded-b-lg transition-all duration-300`}
      >
        <li className="w-full">
          <Link
            className="w-full flex flex-row items-center gap-2"
            href="/dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
            <p>Dashboard</p>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/courses"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>

            <p>Kursus</p>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/students"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
              />
            </svg>

            <p>Murid</p>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="w-full flex flex-row items-center gap-2"
            href="/profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>

            <button onClick={() => clearSession()}>Logout</button>
          </Link>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
};

export default DashboardNavBar;
