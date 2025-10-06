export default function LDNavbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white">
      <div className="flex items-center space-x-2">
        <h1 className="font-bold text-lg">KelasIn</h1>
      </div>
      <ul className="hidden md:flex space-x-6">
        <li><a href="#" className="hover:text-blue-600">Beranda</a></li>
        <li><a href="#" className="hover:text-blue-600">Tentang</a></li>
        <li><a href="#" className="hover:text-blue-600">Panduan</a></li>
        <li><a href="#" className="hover:text-blue-600">Kelas</a></li>
      </ul>
      <div className="hidden md:flex space-x-4">
      <button className="border border-blue-600 text-blue-600 cursor-pointer px-4 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition">
        Log in
      </button>
      <button className="border border-blue-600 text-blue-600 px-4 py-1.5  cursor-pointer  rounded-lg hover:bg-blue-600 hover:text-white transition">
        Sign up
      </button>
      </div>
    </nav>
  );
}
