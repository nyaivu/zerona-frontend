const features = [
  {
    title: "Ramah Di Pahami",
    desc: "Dengan Bahasa Dan Materi yang mudah dipahami oleh semua kalangan.",
    icon: "🧩",
  },
  {
    title: "Powerful",
    desc: "Platform elearning dilengkapi fitur dan performa tinggi untuk mendukung pembelajaran daring.",
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
    <section className="px-8 md:px-16 py-16 bg-white" id="features">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((f) => (
          <div key={f.title} className="p-6 rounded-xl cursor-pointer shadow hover:shadow-md transition">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
