"use client";

import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { logout } = useAuth();

  return (
    <main className="min-h-screen">
      <h1>Home</h1>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors font-bold"
        onClick={logout}
      >
        Logout
      </button>
    </main>
  );
}
