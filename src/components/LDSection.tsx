"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Bagaimana cara mendaftar untuk menggunakan Zerona?",
    answer:
      "Anda dapat mendaftar melalui portal resmi Zerona menggunakan akun Anda.",
  },
  {
    question: "Apakah saya bisa mengakses E-learning dari smartphone?",
    answer: "Ya, Anda dapat mengakses melalui browser",
  },
  {
    question:
      "Bagaimana jika mengalami kesulitan teknis saat menggunakan platform?",
    answer:
      "Silakan hubungi tim dukungan teknis melalui email atau nomor kontak yang tersedia di bawah.",
  },
];

export default function LDSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Variants untuk animasi global section
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-16 overflow-hidden"
      id="guide"
    >
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.15 }}
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Gambar dengan efek hover dan animasi masuk */}
        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.03, rotate: -1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          <motion.img
            src="/assets/student2.jpg"
            alt="Mahasiswa belajar"
            className="rounded-2xl shadow-lg w-full object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>

        {/* Konten FAQ */}
        <motion.div variants={fadeInUp}>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Elearning bantu kamu{" "}
            <span className="text-blue-600">Tumbuh cepat 🚀</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Zerona dirancang agar kamu bisa belajar mandiri dengan sistem
            pembelajaran interaktif, akses materi kapan pun dan di mana pun,
            tanpa batas.
          </motion.p>

          {/* FAQ List */}
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`border rounded-xl overflow-hidden shadow-sm transition ${
                  openIndex === index
                    ? "border-blue-400 bg-blue-50/50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-blue-600"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-4 text-gray-600 text-sm"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
