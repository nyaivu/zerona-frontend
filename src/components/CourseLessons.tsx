// components/CourseLessons.tsx
"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCourseLessons, Lesson } from "@/interfaces/courses"; // Adjust path
import TextInput from "./TextInput";
import { axiosInstance } from "@/utils/axios";
import { useSessionStore } from "@/stores/sessionStore";

interface CourseLessonsProps {
  courseId: number; // The ID passed from the URL/Server Component
}

interface LessonFormData {
  title: string;
  content: string;
}

export function CourseLessons({ courseId }: CourseLessonsProps) {
  // TanStack Query to fetch the single course
  const { role } = useSessionStore();
  const isGuru = role === "guru";
  const {
    data: lessons,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    // The queryKey must include the dynamic ID to ensure refetching when the ID changes
    queryKey: [`course-${courseId}-lessons`, courseId],
    queryFn: () => fetchCourseLessons(courseId),
    // Ensure the query is disabled if the courseId is invalid (e.g., 0)
    enabled: courseId > 0,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Memuat pelajaran...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600 border border-red-200 bg-red-50 rounded-lg">
        Gagal memuat pelajaran. Error: {error.message}
      </div>
    );
  }

  // Safety check, although query should be disabled if course is null
  if (!lessons) {
    return (
      <div className="p-8 text-center text-gray-500">
        Pelajaran tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Pelajaran</h2>

      {isGuru && <AddLessonForm refetch={refetch} courseId={courseId} />}

      {lessons.map((lesson) => (
        <div key={lesson.id} className="">
          <h3 className="text-2xl text-gray-800 mb-2">{lesson.title}</h3>
          <p className="text-lg text-gray-600 mb-6 border-b pb-4">
            {lesson.content}
          </p>
        </div>
      ))}
    </div>
  );
}

interface AddLessonFormProps {
  courseId: number;
  refetch: () => void; // Function to refetch the lessons list
}

const AddLessonForm = ({ courseId, refetch }: AddLessonFormProps) => {
  const axiosInst = axiosInstance;
  const { accessToken } = useSessionStore();
  const mutation = useMutation<Lesson, Error, LessonFormData>({
    mutationFn: async (formData) => {
      // POST request to your Ruby on Rails /register endpoint
      const response = await axiosInst.post<Lesson>(
        `/courses/${courseId}/lessons`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Registration successful!", data);
      refetch();
    },
    onError: (error) => {
      // Display registration error (e.g., email already exists, password too short)
      console.error("Registration failed:", error.message);
      // You might want to update local state here to display a more user-friendly error
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // Construct the payload matching the required body structure
    const payload: LessonFormData = {
      title: title,
      content: content,
    };

    mutation.mutate(payload);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4">
      <TextInput
        label="Judul Pelajaran"
        name="title"
        placeholder="Masukkan judul..."
      />
      <div className="flex flex-col gap-2 w-full sm:text-lg">
        <label htmlFor="nama-lengkap">Konten Pelajaran</label>
        <textarea
          name="content"
          id="content"
          className="outline-2 outline-gray-400 rounded-md px-2 py-1"
        />
      </div>
      <button
        className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
        type="submit"
        disabled={mutation.isPending} // Disable while loading
      >
        {mutation.isPending ? "Memproses..." : "Tambahkan pelajaran"}
      </button>
    </form>
  );
};
