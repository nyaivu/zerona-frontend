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
          <p>Zerona</p>
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
