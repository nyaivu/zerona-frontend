"use client";

import Image from "next/image";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import Link from "next/link";

const DashboardNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-row justify-between items-center px-2 sm:px-4 py-2 z-50 bg-background">
      <div className="font-medium font-serif">
        <Link href="/">
          <p>KelasIn</p>
        </Link>
      </div>

      <ul
        className={`hidden origin-top w-full sm:flex flex-row items-center justify-end z-40 text-foreground gap-4 bg-background rounded-b-lg transition-all duration-300`}
      >
        <li>
          <Link className="flex flex-row items-center gap-2" href="/dashboard">
            <p>Dashboard</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/courses"
          >
            <p>Mata Pelajaran</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex flex-row items-center gap-2"
            href="/dashboard/courses"
          >
            <p>Siswa</p>
          </Link>
        </li>
        <li>
          <Link className="flex flex-row items-center gap-2" href="/profile">
            <Image
              className="w-auto h-6 object-cover aspect-square rounded-full"
              src="/assets/auth-bg.png"
              width={150}
              height={150}
              alt="Profile Photo"
            />
          </Link>
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
      <div className="fixed inset-0 top-12 w-screen h-auto sm:hidden">
        <ul
          style={{
            transform: isOpen ? "scaleY(100%)" : "scaleY(0)",
          }}
          className={`origin-top w-full flex flex-col items-start justify-center z-40 text-lg text-foreground gap-2 p-4 bg-background rounded-b-lg transition-all duration-300`}
        >
          <li>
            <Link className="flex flex-row items-center gap-2" href="/profile">
              <Image
                className="w-auto h-6 object-cover aspect-square rounded-full"
                src="/assets/auth-bg.png"
                width={150}
                height={150}
                alt="Profile Photo"
              />
              <p>Profile</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex flex-row items-center gap-2"
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
          <li>
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
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>

              <p>Mata Pelajaran</p>
            </Link>
          </li>
          <li>
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <p>Siswa</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
