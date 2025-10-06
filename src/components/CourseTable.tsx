// components/CourseTable.tsx
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

// Import the Course interface and fetch function
import { Course, fetchCourses } from "@/interfaces/courses"; // Adjust path as necessary
import Link from "next/link";

// 1. Define Column Helper
const columnHelper = createColumnHelper<Course>();

// 2. Define Columns
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Judul Kursus",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Deskripsi",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user_id", {
    header: "User ID (Pengajar)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "actions",
    header: "Aksi",
    cell: (info) => {
      const courseId = info.row.original.id;

      return (
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="text-primary hover:underline"
        >
          Detail
        </Link>
      );
    },
  }),
];

export function CourseTable() {
  const { data, isLoading, isError, error } = useQuery<Course[], Error>({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const table = useReactTable({
    data: data || [], // Use empty array while data is loading
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p className="p-4 text-center">Memuat data kursus...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-red-500">Gagal memuat data: {error.message}</p>
    );
  }

  // 6. Table Rendering (using Tailwind CSS for styling)
  return (
    <div className="p-4">
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Optional: Show message if data is empty */}
      {data && data.length === 0 && (
        <p className="mt-4 text-center text-gray-500">
          Tidak ada data kursus yang tersedia.
        </p>
      )}
    </div>
  );
}
