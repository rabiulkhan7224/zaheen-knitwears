"use client";

import Link from "next/link";

export default function DashboardOrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <p>This is a placeholder for the orders list.</p>
      <div className="mt-4">
        <Link href="/dashboard/orders" className="text-sm text-primary underline">Refresh</Link>
      </div>
    </div>
  );
}
