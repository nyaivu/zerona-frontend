"use client";
import { motion } from "framer-motion";

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
    <section
      id="courses"
      className="px-8 md:px-16 py-16 bg-gray-50 text-center overflow-hidden"
    >
      {/* Judul Section */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Daftar Pilihan Kelas
      </motion.h2>

      {/* Grid Card */}
      <motion.div
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
      >
        {courses.map((c) => (
          <motion.div
            key={c.name}
            className="bg-white p-6 rounded-xl cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              y: -4,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h3 className="font-semibold text-lg mb-2 text-blue-900">
              {c.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
