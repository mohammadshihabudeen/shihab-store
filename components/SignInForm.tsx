"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInForm() {
  const { status } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleSignIn = async (provider: "credentials" | "google") => {
    setLoading(true);
    setError("");

    const result = await signIn(provider, {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials, please try again.");
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <form className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button onClick={() => handleSignIn("credentials")} disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Button onClick={() => handleSignIn("google")} disabled={loading} variant="outline" className="w-full">
        Sign in with Google
      </Button>
    </form>
  );
}
