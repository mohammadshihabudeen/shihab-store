"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

const Session = () => {
const { data: session, status } = useSession();
  const router = useRouter();
  const { setUser } = useUserContext();

  useEffect(() => {
    const checkSession = async () => {
      if (status === "loading") return; // If authenticated, stay on the dashboard
      if (!session) {
        await router.replace("/signup"); // Ensure navigation happens after resolving session
      }
      else {
        setUser({ id: session.user?.id || "", username: session.user?.name || "", role: session.user?.role || "user" });
      }
    };

    checkSession();
  }, [session, status, router, setUser]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Redirecting...</h1>
      </div>
    );
  }

}

export default Session
