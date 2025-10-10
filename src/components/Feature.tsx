"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Ramah Di Pahami",
    desc: "Dengan Bahasa dan Materi yang mudah dipahami oleh semua kalangan.",
    icon: "🧩",
  },
  {
    title: "Powerful",
    desc: "Platform e-learning dengan performa tinggi dan fitur lengkap untuk mendukung pembelajaran daring.",
    icon: "⚙️",
  },
  {
    title: "Hypercontent",
    desc: "Tersedia berbagai format course dan konten multimedia interaktif dalam satu platform.",
    icon: "📚",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative px-8 md:px-16 py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Judul */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-12 text-blue-900"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Kenapa Memilih <span className="text-blue-600">KelasIn?</span>
      </motion.h2>

      {/* Grid Fitur */}
      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
        viewport={{ once: true }}
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            className="p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-md border border-blue-100 hover:shadow-2xl transition relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 30px rgba(59,130,246,0.25)",
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Icon */}
            <motion.div
              className="text-5xl mb-4"
              whileHover={{ rotate: 10, scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {f.icon}
            </motion.div>

            {/* Title & Desc */}
            <h3 className="font-semibold text-xl text-blue-900 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>

            {/* Hover Glow Accent */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-transparent opacity-0 hover:opacity-100 transition rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
