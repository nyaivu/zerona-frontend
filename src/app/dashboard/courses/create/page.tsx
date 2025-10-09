"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { useSessionStore } from "@/stores/sessionStore";
import TextInput from "@/components/TextInput";
import { Course } from "@/interfaces/courses"; // Assuming this type exists

// --- 1. Define the shape of the data for the new course ---
interface NewCourseData {
  title: string;
  description: string;
}

// --- 2. Create the API function that the mutation will call ---
const createCourse = async (courseData: NewCourseData): Promise<Course> => {
  const { accessToken } = useSessionStore.getState();
  const response = await axiosInstance.post("/courses", courseData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// --- 3. The Page Component ---
const CreateCoursesPage = () => {
  const [formData, setFormData] = useState<NewCourseData>({
    title: "",
    description: "",
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  // --- 4. Mutation Hook for creating the course ---
  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (newCourse) => {
      alert("Kursus berhasil dibuat!");
      // Invalidate queries to refetch the course lists on other pages
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
      // Redirect to the new course's detail page
      router.push(`/dashboard/courses/${newCourse.id}`);
    },
    onError: (error) => {
      alert(`Gagal membuat kursus: ${error.message}`);
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Convert teacher_id to a number, keep others as is
      [name]: name === "teacher_id" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Judul, Deskripsi, dan ID Guru tidak boleh kosong.");
      return;
    }
    createCourseMutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-4 px-4 py-8 md:px-32 bg-background rounded-r-2xl overflow-hidden"
    >
      <h1 className="font-bold text-4xl">Buat Kursus Baru</h1>

      <TextInput
        name="title"
        label="Judul"
        placeholder="Masukkan judul..."
        value={formData.title}
        onChange={handleInputChange}
      />
      <TextInput
        name="description"
        label="Deskripsi"
        placeholder="Masukkan deskripsi..."
        value={formData.description}
        onChange={handleInputChange}
      />

      <div className="w-full flex flex-col items-center gap-4 mt-4">
        <button
          type="submit"
          disabled={createCourseMutation.isPending}
          className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createCourseMutation.isPending ? "Membuat..." : "Buat Kursus"}
        </button>
      </div>
    </form>
  );
};

export default CreateCoursesPage;
