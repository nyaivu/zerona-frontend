// src/hooks/useIsEnrolled.ts

import { Course } from "@/interfaces/courses";
import { useSessionStore } from "@/stores/sessionStore";
import { axiosInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios"; // Removed unused 'axios' import

// Define the shape of the full API response
interface MyCoursesResponse {
  courses: Course[];
  // include other properties from the response if needed
  user: object;
  source: string;
}

// Corrected fetchMyCourses function
const fetchMyCourses = async (): Promise<Course[]> => {
  const { accessToken } = useSessionStore.getState();

  // 1. Tell Axios to expect the MyCoursesResponse object
  const { data } = await axiosInstance.get<MyCoursesResponse>("/mycourses", {
    // Assuming endpoint is /mycourses
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // 2. Return the nested 'courses' array from the response object
  return data.courses;
};

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
