"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Axios from "@/libs/axiosConfig";

type FormError = {
  path?: string;
  message: string;
};

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<FormError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const axios = await Axios.post("/auth/signup", { name, email, password });
      const data = await axios.data;
      if (!data) {
        setError({
          path: data?.path,
          message: data?.message || "Signup failed",
        });
        return;
      }
      console.log({ data });
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ result });
      if (!result || !result.ok) {
        setError({ message: result?.error || "Login failed after signup" });
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      setError({ message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters long
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full h-11 font-medium"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
      </p>
    </form>
  );
}
