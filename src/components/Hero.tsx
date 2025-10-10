"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-gray-50 overflow-hidden"
    >
      {/* Text Section */}
      <motion.div
        className="max-w-lg space-y-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Selamat datang di <br />{" "}
          <span className="text-primary">KelasIn</span>
        </h2>
        <p className="text-gray-600">
          KelasIn merupakan sistem pendukung dalam pengelolaan pembelajaran
          daring. Dirancang agar Mahasiswa dan Siswa dapat belajar secara
          efektif dan efisien di mana pun.
        </p>
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Selengkapnya
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="mt-10 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src="assets/student.jpg"
          alt="Mahasiswa belajar"
          className="rounded-full bg-blue-100 p-6 w-64 md:w-80 shadow-lg"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>
    </section>
  );
}
