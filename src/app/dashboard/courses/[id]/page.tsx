import { CourseDetail } from "@/components/CourseDetail";
import { CourseLessons } from "@/components/CourseLessons";

interface CourseDetailPageProps {
  params: {
    id: string; // This is the 'id' captured from the URL
  };
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const param = await params;
  const courseId = parseInt(param.id);

  if (isNaN(courseId) || courseId <= 0) {
    return <div className="p-8 text-red-600">ID kursus tidak valid.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <CourseDetail courseId={courseId} />
      <CourseLessons courseId={courseId} />
    </main>
  );
}
