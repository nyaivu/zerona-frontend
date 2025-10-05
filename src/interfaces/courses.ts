// utils/dataFetcher.ts (or wherever fetchCourses is defined)
import { axiosInstance } from "@/utils/axios";
import { useSessionStore } from "@/stores/sessionStore"; // Import the store

export interface Course {
  id: number;
  title: string;
  description: string;
  user_id: number;
  created_at: string; // Add new fields
  updated_at: string; // Add new fields
}

export const fetchCourses = async (): Promise<Course[]> => {
  // 1. Get the current state of the store (accessing it outside a component)
  //    We use the "get" method provided by Zustand to grab state outside a hook.
  const { accessToken } = useSessionStore.getState();

  // 2. Check if the token exists
  if (!accessToken) {
    // If the token is missing, throw an error or handle it as unauthorized
    throw new Error("Authentication token is missing. Please log in.");
  }

  // 3. Make the API call with the Authorization header
  const response = await axiosInstance.get<Course[]>("/courses", {
    headers: {
      // Standard format for JWTs: "Bearer <token>"
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const fetchCourseDetail = async (courseId: number): Promise<Course> => {
  // 1. Get the current state of the store
  const { accessToken } = useSessionStore.getState();

  if (!accessToken) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  // 2. Fetch the specific course using the ID
  const response = await axiosInstance.get<Course>(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
