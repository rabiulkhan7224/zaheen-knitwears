"use client";

import { useParams } from "next/navigation";

export default function DashboardProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Product {id}</h1>
      <p>This is a placeholder for the admin product detail page.</p>
    </div>
  );
}
