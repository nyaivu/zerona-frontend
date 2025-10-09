export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-gray-50" id="home">
      <div className="max-w-lg space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Selamat datang di <br />{" "}
          <span className="text-primary">KelasIn</span>
        </h2>
        <p className="text-gray-600">
          KelasIn merupakan sistem pendukung dalam pengelolaan pembelajaran
          daring. Dirancang agar Mahasiswa Dan Siswa dapat belajar secara
          efektif dan efisien di mana pun.
        </p>
        <div className="flex space-x-4">
          <button className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Selengkapnya
          </button>
        </div>
      </div>
      <div className="mt-10 md:mt-0">
        <img
          src="assets/student.jpg"
          alt="Mahasiswa belajar"
          className="rounded-full bg-blue-100 p-6 w-64 md:w-80"
        />
      </div>
    </section>
  );
}
