// components/CourseDetail.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCourseDetail } from "@/interfaces/courses"; // Adjust path

interface CourseDetailProps {
  courseId: number; // The ID passed from the URL/Server Component
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  // TanStack Query to fetch the single course
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    // The queryKey must include the dynamic ID to ensure refetching when the ID changes
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseDetail(courseId),
    // Ensure the query is disabled if the courseId is invalid (e.g., 0)
    enabled: courseId > 0,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Memuat detail kursus...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600 border border-red-200 bg-red-50 rounded-lg">
        Gagal memuat detail kursus. Error: {error.message}
      </div>
    );
  }

  // Safety check, although query should be disabled if course is null
  if (!course) {
    return (
      <div className="p-8 text-center text-gray-500">
        Kursus tidak ditemukan.
      </div>
    );
  }

  // Format the date for better display
  const createdAtDate = new Date(course.created_at).toLocaleDateString("id-ID");

  // Render the course details
  return (
    <div className="p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        {course.title}
      </h1>
      <p className="text-lg text-gray-600 mb-6 border-b pb-4">
        ID Kursus: {course.id} | Dibuat pada: {createdAtDate}
      </p>

      {/* Deskripsi Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Deskripsi</h2>
        <p className="text-gray-700 mb-8 leading-relaxed">
          {course.description}
        </p>
      </section>

      {/* Lessons */}

      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
        <span>Pengajar ID: {course.user_id}</span>
        <button
          onClick={() => alert(`Navigasi ke halaman edit kursus ${course.id}`)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit Kursus
        </button>
      </div>
    </div>
  );
}
