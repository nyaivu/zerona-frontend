"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-16" id="about">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="/assets/about.jpg"
            alt="Tentang KelasIn"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
            Tentang <span className="text-primary">KelasIn</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>KelasIn</strong> adalah platform e-learning modern yang dirancang untuk 
            mempermudah guru dan siswa dalam proses pembelajaran digital. 
            Dengan teknologi terkini, kami menghadirkan pengalaman belajar yang interaktif, 
            fleksibel, dan menyenangkan.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Visi kami adalah mendukung terwujudnya <strong>Indonesia Emas 2045 </strong> 
            melalui pendidikan berbasis teknologi yang inklusif dan adaptif terhadap perkembangan zaman.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
