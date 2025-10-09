"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCourseDetail, Course } from "@/interfaces/courses";
import { EnrollmentButton } from "./EnrollmentButton";
import { useSessionStore } from "@/stores/sessionStore";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation"; // 1. Import the router
import { useIsEnrolled } from "@/hooks/UseIsEnrolled";

// --- Component Props Interface ---
interface CourseDetailProps {
  courseId: number;
}

// --- API function for updating the course ---
const updateCourse = async (payload: {
  courseId: number;
  title: string;
  description: string;
}) => {
  const { courseId, ...data } = payload;
  const { accessToken } = useSessionStore.getState();
  const response = await axiosInstance.put(`/courses/${courseId}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data as Course;
};

// 2. Add the API function for deleting a course
const deleteCourse = async (courseId: number) => {
  const { accessToken } = useSessionStore.getState();
  const response = await axiosInstance.delete(`/courses/${courseId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export function CourseDetail({ courseId }: CourseDetailProps) {
  // --- SECTION 1: STATE AND HOOKS ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const queryClient = useQueryClient();
  const router = useRouter(); // 3. Initialize the router
  const role = useSessionStore((state) => state.role);

  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseDetail(courseId),
    enabled: !!courseId,
  });

  const { data: isEnrolled, isLoading: isEnrollmentLoading } =
    useIsEnrolled(courseId);

  useEffect(() => {
    if (course) {
      setFormData({ title: course.title, description: course.description });
    }
  }, [course]);

  // --- SECTION 2: MUTATION LOGIC ---
  const updateMutation = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      setIsEditing(false);
    },
    onError: (error) => alert(`Gagal memperbarui kursus: ${error.message}`),
  });

  // 4. Add the mutation hook for deleting
  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      alert("Kursus berhasil dihapus.");
      // Invalidate queries to update course lists
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["myCourses"] });
      // Redirect the user away from the deleted course page
      router.push("/dashboard"); // Adjust this path to your main courses list page
    },
    onError: (error) => {
      alert(`Gagal menghapus kursus: ${error.message}`);
    },
  });

  // --- SECTION 3: EVENT HANDLERS ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ courseId, ...formData });
  };
  const handleCancel = () => {
    if (course) {
      setFormData({ title: course.title, description: course.description });
    }
    setIsEditing(false);
  };

  // 5. Add the handler for the delete action
  const handleDelete = () => {
    if (!course) return;

    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus kursus ini? Tindakan ini tidak dapat diurungkan."
      )
    ) {
      deleteMutation.mutate(course.id);
    }
  };

  // --- Loading/Error states ---
  if (isCourseLoading || isEnrollmentLoading) {
    return <div className="p-8 text-center">Memuat detail kursus...</div>;
  }
  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Gagal memuat detail. Error: {error?.message}
      </div>
    );
  }
  if (!course) {
    return (
      <div className="p-8 text-center text-gray-500">
        Kursus tidak ditemukan.
      </div>
    );
  }

  const createdAtDate = new Date(course.created_at).toLocaleString("id-ID");

  return (
    <form
      onSubmit={handleSave}
      className="p-8 bg-white shadow-xl rounded-lg max-w-4xl mx-auto"
    >
      {/* --- Editable Title and Description --- */}
      {isEditing ? (
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Judul
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full text-4xl font-extrabold border-gray-300 rounded-md shadow-sm"
          />
        </div>
      ) : (
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          {course.title}
        </h1>
      )}

      <p className="text-lg text-gray-600 mb-6 border-b pb-4">
        ID Kursus: {course.id} | Dibuat pada: {createdAtDate}
      </p>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Deskripsi</h2>
        {isEditing ? (
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={5}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        ) : (
          <p className="text-gray-700 mb-8 leading-relaxed">
            {course.description}
          </p>
        )}
      </section>

      {/* --- Footer with Edit and Delete Buttons --- */}
      <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t">
        <span>Pengajar ID: {course.user_id}</span>
        {/* 6. Add the Delete button next to the Edit button */}
        {role === "guru" && isEnrolled && !isEditing && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit Kursus
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        )}
      </div>

      {/* --- Action Buttons Section (Save/Cancel or Enroll) --- */}
      <div className="mt-8 pt-6 border-t">
        {isEditing ? (
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Batal
            </button>
          </div>
        ) : (
          role !== "guru" && (
            <EnrollmentButton
              courseId={course.id}
              initialIsEnrolled={isEnrolled ?? false}
              isCheckingEnrollment={isEnrollmentLoading}
            />
          )
        )}
      </div>
    </form>
  );
}
