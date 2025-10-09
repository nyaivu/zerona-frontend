"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Feedback, fetchCourseFeedbacks } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axios";
import { useSessionStore } from "@/stores/sessionStore";

export interface CourseFeedbacksProps {
  courseId: number;
}

export function CourseFeedbacks({ courseId }: CourseFeedbacksProps) {
  const {
    data: feedbacks,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Feedback[], Error>({
    queryKey: ["courseFeedbacks", courseId],
    queryFn: () => fetchCourseFeedbacks(courseId),
    enabled: courseId > 0,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Memuat feedback...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Gagal memuat feedback. Error: {error.message}
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Ulasan & Feedback
      </h2>

      <AddFeedbackForm courseId={courseId} refetch={refetch} />

      {feedbacks && feedbacks.length > 0 ? (
        <ul className="space-y-4">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="p-4 bg-gray-50 rounded-md border">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">
                  {feedback.user.first_name} {feedback.user.last_name}
                </p>
                <time className="text-xs text-gray-500">
                  {format(new Date(feedback.created_at), "d MMMM yyyy, HH:mm")}
                </time>
              </div>
              <p className="text-gray-700">{feedback.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          Belum ada feedback untuk kursus ini.
        </p>
      )}
    </div>
  );
}

interface AddFeedbackFormProps {
  courseId: number;
  refetch: () => void; // Function to refetch the lessons list
}

interface FeedbackFormData {
  content: string;
}

const AddFeedbackForm = ({ courseId, refetch }: AddFeedbackFormProps) => {
  const axiosInst = axiosInstance;
  const { accessToken } = useSessionStore();
  const mutation = useMutation<Feedback, Error, FeedbackFormData>({
    mutationFn: async (formData) => {
      // POST request to your Ruby on Rails /register endpoint
      const response = await axiosInst.post<Feedback>(
        `/courses/${courseId}/feedbacks`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Registration successful!", data);
      refetch();
    },
    onError: (error) => {
      // Display registration error (e.g., email already exists, password too short)
      console.error("Registration failed:", error.message);
      // You might want to update local state here to display a more user-friendly error
    },
  });

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    // Construct the payload matching the required body structure
    const payload: FeedbackFormData = {
      content: content,
    };

    mutation.mutate(payload);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4">
      <div className="flex flex-col gap-2 w-full sm:text-lg">
        <label htmlFor="content">Berikan pendapat anda</label>
        <textarea
          name="content"
          id="content"
          className="outline-2 outline-gray-400 rounded-md px-2 py-1"
        />
      </div>

      <button
        className="cursor-pointer bg-primary w-full text-background font-bold px-4 py-2 rounded-md hover:bg-background hover:text-foreground transition-all outline-2 -outline-offset-2 outline-primary disabled:opacity-50"
        type="submit"
        disabled={mutation.isPending} // Disable while loading
      >
        {mutation.isPending ? "Memproses..." : "Tambahkan Ulasan"}
      </button>
    </form>
  );
};
