import TextInput from "@/components/TextInput";

const CreateCoursesPage = () => {
  return (
    <form
      // action={formAction}
      className="flex flex-col items-start justify-center gap-4 px-4 md:px-32 bg-background rounded-r-2xl overflow-hidden"
    >
      <h1 className="font-bold text-4xl">Buat Course</h1>

      <TextInput name="title" label="Judul" placeholder="Masukkan judul..." />
      <TextInput
        name="description"
        label="Deskripsi"
        placeholder="Masukkan deskripsi anda..."
      />
      <TextInput
        name="description"
        label="ID Guru"
        placeholder="Masukkan NIP guru..."
      />
      <TextInput
        name="thumbnail_url"
        label="URL Thumbnail"
        placeholder="Masukkan URL gambar thumbnail..."
      />

      <div className="w-full flex flex-col items-center gap-4">
        {/* Submit button */}
        <button
          type="submit"
          className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary"
        >
          Buat Course
        </button>
      </div>
    </form>
  );
};

export default CreateCoursesPage;
