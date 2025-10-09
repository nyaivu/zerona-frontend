// src/hooks/useIsEnrolled.ts

import { Course, fetchMyCourses } from "@/interfaces/courses";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios"; // Removed unused 'axios' import

/**
 * A custom hook to check if the user is enrolled in a specific course.
 * @param courseId The ID of the course to check.
 * @returns A TanStack Query result containing a boolean.
 */
export const useIsEnrolled = (courseId: number | undefined | null) => {
  return useQuery<Course[], AxiosError, boolean>({
    queryKey: ["myCourses"],
    queryFn: fetchMyCourses,
    select: (enrolledCourses) => {
      if (!Array.isArray(enrolledCourses)) {
        return false;
      }
      return enrolledCourses.some((course) => course.id === courseId);
    },
    enabled: !!courseId,
  });
};
