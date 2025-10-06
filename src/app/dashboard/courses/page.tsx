import { CourseTable } from "@/components/CourseTable";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <div className="px-4 py-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Kursus</h1>
        <Link
          className="flex items-center cursor-pointer bg-primary text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
          href="/dashboard/courses/create"
        >
          Buat Kursus
        </Link>
      </div>
      <CourseTable />
    </div>
  );
};

export default CoursesPage;
