"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 

export default function LDNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="font-bold text-lg text-primary">KelasIn</h1>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a href="#home" className="hover:text-primary">
              Beranda
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-primary">
              Tentang
            </a>
          </li>
          <li>
            <a href="#guide" className="hover:text-primary">
              Panduan
            </a>
          </li>
          <li>
            <a href="#courses" className="hover:text-primary">
              Kelas
            </a>
          </li>
        </ul>

        {/* Tombol login/sign up (desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auth/login"
            className="border border-primary text-primary cursor-pointer px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
          >
            Log in
          </Link>
          <Link
            href="/auth/register"
            className="border border-primary text-primary px-4 py-1.5 cursor-pointer rounded-lg hover:bg-primary hover:text-white transition"
          >
            Sign up
          </Link>
        </div>

        {/* Tombol hamburger (mobile) */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-4 bg-white shadow-inner">
          <a href="#home" className="hover:text-primary" onClick={() => setIsOpen(false)}>
            Beranda
          </a>
          <a href="#about" className="hover:text-primary" onClick={() => setIsOpen(false)}>
            Tentang
          </a>
          <a href="#guide" className="hover:text-primary" onClick={() => setIsOpen(false)}>
            Panduan
          </a>
          <a href="#courses" className="hover:text-primary" onClick={() => setIsOpen(false)}>
            Kelas
          </a>
          <div className="flex space-x-3">
            <Link
              href="/auth/login"
              className="border border-primary text-primary px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="border border-primary text-primary px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
