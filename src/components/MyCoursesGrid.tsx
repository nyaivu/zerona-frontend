"use client";

import Link from "next/link";
import { Course, fetchMyCourses } from "@/interfaces/courses"; // Adjust path as necessary
import { useQuery } from "@tanstack/react-query";
// The Image import is no longer needed

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

const MyCoursesGrid = () => {
  const { data, isLoading, isError, error } = useQuery<Course[], Error>({
    queryKey: ["myCourses"],
    queryFn: fetchMyCourses,
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
      <h2 className="font-bold text-3xl">Kursus Anda</h2>
      <div className="flex flex-col items-center md:grid grid-cols-4 grid-flow-row gap-4">
        {data?.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/courses/${course.id}`}
            className="w-full flex flex-col items-start outline outline-gray-500 rounded-md"
          >
            {/* Replaced Image with a div with random background color */}
            <div
              className="w-full max-h-32 min-h-[8rem] flex items-center justify-center text-white text-2xl font-bold rounded-t-md"
              style={{ backgroundColor: stringToColor(course.title) }} // Apply random color
            >
              {/* Display the first letter of the title as a placeholder */}
              {course.title.slice(0, 2)}
            </div>
            <span className="px-4 py-2">
              <h2 className="font-medium text-xl">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MyCoursesGrid;
