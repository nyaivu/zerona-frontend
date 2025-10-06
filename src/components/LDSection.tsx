"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Bagaimana cara mendaftar untuk menggunakan KelasIn?",
    answer: "Anda dapat mendaftar melalui portal resmi KelasIn menggunakan akun Anda."
  },
  {
    question: "Apakah saya bisa mengakses E-learning dari smartphone?",
    answer: "Ya, Anda dapat mengakses melalui browser atau aplikasi mobile yang tersedia di Play Store dan App Store."
  },
  {
    question: "Bagaimana jika mengalami kesulitan teknis saat menggunakan platform?",
    answer: "Silakan hubungi tim dukungan teknis melalui email atau nomor kontak yang tersedia di bawah."
  }
];

export default function LDSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div className="relative">
          <img
            src="/assets/student2.jpg"
            alt="Mahasiswa belajar"
            className="rounded-2xl shadow-md w-full"
          />
        </div>

     
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Elearning membantu mengembangkan keterampilan
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            KelasIn dirancang untuk memudahkan Anda mempelajari pengetahuan. 
            Nikmati kemudahan belajar mandiri dengan sistem pembelajaran yang interaktif 
            dan akses materi kapan saja, di mana saja.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center px-4 py-3 text-left cursor-pointer font-medium hover:bg-gray-100 transition"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <p className="px-4 pb-4 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
