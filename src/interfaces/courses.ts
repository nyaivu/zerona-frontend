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

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface MyCoursesResponse {
  user: {
    id: number;
    name: string;
  };
  source: string;
  courses: Course[];
}

// Define the shape of the full API response
export interface MyCoursesResponse {
  courses: Course[];
  // include other properties from the response if needed
  user: {
    id: number;
    name: string;
  };
  source: string;
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

// Corrected fetchMyCourses function
export const fetchMyCourses = async (): Promise<Course[]> => {
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

export const fetchCourseLessons = async (
  courseId: number
): Promise<Lesson[]> => {
  // 1. Get the current state of the store
  const { accessToken } = useSessionStore.getState();

  if (!accessToken) {
    throw new Error("Authentication token is missing. Please log in.");
  }

  // 2. Fetch the specific course using the ID
  const response = await axiosInstance.get<Lesson[]>(
    `/courses/${courseId}/lessons`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
