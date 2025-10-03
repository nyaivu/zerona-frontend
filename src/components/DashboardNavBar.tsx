"use client";

import Image from "next/image";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";

const DashboardNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="">
      <div className="">
        <p>KelasIn</p>
      </div>
      <Hamburger
        rounded
        toggled={isOpen}
        toggle={setIsOpen}
        size={24}
        color="#1f2937"
      />
      <ul>
        <li>Dashboard</li>
        <li>Mata Pelajaran</li>
        <li>Siswa</li>
        <li>
          <Image
            className="w-auto h-12 object-cover aspect-square rounded-full"
            src="/assets/auth-bg.png"
            width={150}
            height={150}
            alt="Profile Photo"
          />
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavBar;
