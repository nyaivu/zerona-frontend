"use client";

import Link from "next/link";
import { Course, fetchCourses } from "@/interfaces/courses";
import { useQuery } from "@tanstack/react-query";
// No longer need to import Image from "next/image"
import { useSessionStore } from "@/stores/sessionStore";

// Helper function to generate a consistent color from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // A simple hashing algorithm
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    // Ensure the hex value is always two digits
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
};

const CoursesGrid = () => {
  const role = useSessionStore((state) => state.role);

  const { data, isLoading, isError, error } = useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) {
    return <p className="p-4 text-center">Memuat data kursus...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">Gagal memuat data: {error.message}</p>
    );
  }

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl">Semua Kursus</h2>
        {role === "guru" && (
          <Link
            className="flex items-center cursor-pointer bg-primary text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
            href="/dashboard/courses"
          >
            Kelola Kursus
          </Link>
        )}
      </div>
      <div className="flex flex-col items-start md:grid grid-cols-4 grid-flow-row gap-4">
        {data?.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.id}`}
            className="w-full flex flex-col items-start outline outline-gray-500 rounded-md"
          >
            {/* Replaced Image with a div with random background color */}
            <div
              className="w-full h-32 flex items-center justify-center text-white text-2xl font-bold rounded-t-md"
              style={{ backgroundColor: stringToColor(course.title) }} // Apply random color
            >
              {/* Optional: You can put a short title or an icon here */}
              {course.title.slice(0, 2)}
            </div>
            <span className="px-4 py-2">
              <h2 className="font-medium text-xl">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>{" "}
              {/* Changed text-center to text-sm and added text-gray-600 */}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CoursesGrid;
