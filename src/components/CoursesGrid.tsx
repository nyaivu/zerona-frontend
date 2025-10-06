"use client";

import Link from "next/link";

import { Course, fetchCourses } from "@/interfaces/courses"; // Adjust path as necessary
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const CoursesGrid = () => {
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
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {data?.map((course) => (
        <Link
          key={course.id}
          href={`/dashboard/courses/${course.id}`}
          className="flex flex-col items-start outline outline-gray-500 rounded-md p-4"
        >
          <Image
            className="w-full max-h-32 object-cover"
            src="https://picsum.photos/400/300"
            alt="Course photo"
            width={200}
            height={150}
          />

          <h2 className="font-medium text-xl">{course.title}</h2>
          <p className="text-center">{course.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default CoursesGrid;
