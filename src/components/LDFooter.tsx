"use client";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function LDFooter() {
  return (
    <motion.footer
      className="mt-20 bg-blue-900 text-white px-8 py-12 md:px-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="grid md:grid-cols-3 gap-10">
        {/* Layanan Cepat */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="font-semibold mb-4 text-lg border-b border-white/20 pb-2">
            LAYANAN CEPAT
          </h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="hover:text-blue-300 cursor-pointer transition">
              Selayang Pandang
            </li>
            <li className="hover:text-blue-300 cursor-pointer transition">
              Panduan Elearning
            </li>
            <li className="hover:text-blue-300 cursor-pointer transition">
              Daftar Matakuliah
            </li>
            <li className="hover:text-blue-300 cursor-pointer transition">
              Laporan Error Sistem
            </li>
          </ul>
        </motion.div>

        {/* Layanan Teknis */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="font-semibold mb-4 text-lg border-b border-white/20 pb-2">
            LAYANAN TEKNIS
          </h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>📧 kelasin@kelasin.ac.id</li>
            <li>📞 +62 833-444-5555</li>
          </ul>
        </motion.div>

        {/* Sosial Media */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h3 className="font-semibold mb-4 text-lg border-b border-white/20 pb-2">
            SOSIAL MEDIA
          </h3>
          <div className="flex space-x-4 text-white/80">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Facebook />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Twitter />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Instagram />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="mt-10 text-center text-sm text-white/70 border-t border-white/10 pt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        © {new Date().getFullYear()} <span className="text-blue-300 font-semibold">KelasIn</span>. Semua Hak Dilindungi.
      </motion.div>
    </motion.footer>
  );
}
