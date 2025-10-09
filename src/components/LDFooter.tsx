export default function LDFooter() {
  return (
    <div className="mt-16 bg-blue-900 text-white  px-8 py-12 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-semibold mb-3">LAYANAN CEPAT</h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>Selayang Pandang</li>
          <li>Panduan Elearning</li>
          <li>Daftar Matakuliah</li>
          <li>Laporan Error Sistem</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">LAYANAN TEKNIS</h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>kelasin@kelasin.ac.id</li>
          <li>+62 833-444-5555</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-3">SOSIAL MEDIA</h3>
        <ul className="space-y-2 text-sm opacity-90">
          <li>@kelasin</li>
        </ul>
      </div>
    </div>
  )

}