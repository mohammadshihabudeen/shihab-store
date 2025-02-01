"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession(); // `update` forces session state update
  const [userSession, setUserSession] = useState(session);

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevents page reload
    setUserSession(null); // Clear local session state
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        Product Dashboard
      </Link>

      <div>
        {userSession ? (
          <div className="flex items-center gap-4">
            <span className="text-sm">{userSession.user?.name}</span>
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
