const courses = [
  { name: "Pemrograman Web", desc: "Belajar dasar pengembangan web modern." },
  { name: "AI dan Machine Learning", desc: "Pengenalan konsep dan algoritma kecerdasan buatan." },
  { name: "Desain UI/UX", desc: "Membuat tampilan aplikasi yang menarik dan mudah digunakan." },
  { name: "Pemrograman Mobile", desc: "Membangun aplikasi Android dengan Kotlin atau Flutter." },
  { name: "Basis Data", desc: "Belajar MySQL dan PostgreSQL untuk menyimpan dan mengelola data aplikasi." },
  { name: "Cloud Computing", desc: "Pelajari konsep dasar dan penerapan layanan cloud seperti AWS dan Google Cloud." },
];

export default function CourseList() {
  return (
    <section className="px-8 md:px-16 py-16 bg-gray-50 text-center" id="courses">
      <h2 className="text-2xl font-bold mb-8">Daftar Pilihan Kelas</h2>
      <div className="grid md:grid-cols-3 gap-6">
        
        {courses.map((c) => (
          <div key={c.name} className="bg-white p-6 rounded-xl cursor-pointer shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">{c.name}</h3>
            <p className="text-gray-600 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
