// src/components/EnrollmentButton.tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axios";
import { useSessionStore } from "@/stores/sessionStore";

// Define the API functions
// --- Enroll Function ---
const enrollToCourse = async (courseId: number) => {
  const { accessToken } = useSessionStore.getState();
  const response = await axiosInstance.post(
    `/courses/${courseId}/enroll`,
    {}, // POST request might not need a body
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};

// --- Unenroll Function ---
const unenrollFromCourse = async (courseId: number) => {
  const { accessToken } = useSessionStore.getState();
  const response = await axiosInstance.delete(`/courses/${courseId}/enroll`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

// Define the component's props
interface EnrollmentButtonProps {
  courseId: number;
  initialIsEnrolled: boolean;
  isCheckingEnrollment: boolean; // Is the initial check still loading?
}

export function EnrollmentButton({
  courseId,
  initialIsEnrolled,
  isCheckingEnrollment,
}: EnrollmentButtonProps) {
  const queryClient = useQueryClient();

  // Mutation for enrolling in a course
  const enrollMutation = useMutation({
    mutationFn: enrollToCourse,
    onSuccess: () => {
      // When successful, invalidate the 'myCourses' query to refetch the enrollment status
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
    },
    onError: (error) => {
      // Optional: handle errors, e.g., show a toast notification
      alert(`Error enrolling: ${error.message}`);
    },
  });

  // Mutation for unenrolling from a course
  const unenrollMutation = useMutation({
    mutationFn: unenrollFromCourse,
    onSuccess: () => {
      // Invalidate the same query to update the status
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
    },
    onError: (error) => {
      alert(`Error unenrolling: ${error.message}`);
    },
  });

  // Combine all loading states
  const isLoading =
    isCheckingEnrollment ||
    enrollMutation.isPending ||
    unenrollMutation.isPending;

  return (
    <div>
      {initialIsEnrolled ? (
        <button
          onClick={() => unenrollMutation.mutate(courseId)}
          disabled={isLoading}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400"
        >
          {unenrollMutation.isPending
            ? "Membatalkan..."
            : "Batalkan Pendaftaran"}
        </button>
      ) : (
        <button
          onClick={() => enrollMutation.mutate(courseId)}
          disabled={isLoading}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          {enrollMutation.isPending ? "Mendaftar..." : "Daftar ke Kursus Ini"}
        </button>
      )}
    </div>
  );
}
