// app/dashboard/courses/[id]/page.tsx

import React from "react";
// Assuming you moved your CourseDetail logic here
import { CourseDetail } from "@/components/CourseDetail";

// Next.js passes dynamic route segments in the params prop
interface CourseDetailPageProps {
  params: {
    id: string; // This is the 'id' captured from the URL
  };
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const courseId = parseInt(params.id);

  if (isNaN(courseId) || courseId <= 0) {
    // Handle invalid ID case
    return <div className="p-8 text-red-600">ID kursus tidak valid.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <CourseDetail courseId={courseId} />
    </main>
  );
}
