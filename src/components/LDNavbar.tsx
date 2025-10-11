"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LDNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "#home", label: "Beranda" },
    { href: "#about", label: "Tentang" },
    { href: "#guide", label: "Panduan" },
    { href: "#courses", label: "Kelas" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-90"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="font-bold text-lg text-primary cursor-pointer"
        >
          Zerona
        </motion.h1>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1, color: "#2563eb" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href={item.href} className="hover:text-primary transition">
                {item.label}
              </a>
            </motion.li>
          ))}
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

      {/* Menu mobile dengan animasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden flex flex-col items-center space-y-4 pb-4 bg-white shadow-inner"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, color: "#2563eb" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="hover:text-primary transition"
              >
                {item.label}
              </motion.a>
            ))}

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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
