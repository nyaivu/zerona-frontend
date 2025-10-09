// components/CourseDetail.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCourseDetail } from "@/interfaces/courses"; // Adjust path
import { useIsEnrolled } from "@/hooks/UseIsEnrolled";
import { EnrollmentButton } from "./EnrollmentButton";

interface CourseDetailProps {
  courseId: number; // The ID passed from the URL/Server Component
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  // Query to fetch the course details
  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseDetail(courseId),
    enabled: !!courseId,
  });

  // Query to check if the user is enrolled
  const { data: isEnrolled, isLoading: isEnrollmentLoading } =
    useIsEnrolled(courseId);

  // Display a loading message while either query is running
  if (isCourseLoading || isEnrollmentLoading) {
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
        {/* --- NEW: Enrollment Button Section --- */}
      </div>
      <div className="mt-8 pt-6 border-t">
        <EnrollmentButton
          courseId={course.id}
          initialIsEnrolled={isEnrolled ?? false}
          isCheckingEnrollment={isEnrollmentLoading}
        />
      </div>
    </div>
  );
}
