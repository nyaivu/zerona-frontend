import Link from "next/link";

export default function LDNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center space-x-2">
        <h1 className="font-bold text-lg">KelasIn</h1>
      </div>
      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="#" className="hover:text-primary">
            Beranda
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-primary">
            Tentang
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-primary">
            Panduan
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-primary">
            Kelas
          </a>
        </li>
      </ul>
      <div className="hidden md:flex space-x-4">
        <Link
          href="/auth/login"
          className="border border-primary text-primary cursor-pointer px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition"
        >
          Log in
        </Link>
        <Link
          href="/auth/register"
          className="border border-primary text-primary px-4 py-1.5  cursor-pointer  rounded-lg hover:bg-primary hover:text-white transition"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}
