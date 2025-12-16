"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      console.log({ result });
      if (!result || !result.ok) {
        const errors = result?.error ? JSON.parse(result?.error) : null;
        if (Array.isArray(errors)) {
          errors.map((error) => {
            setError({
              path: error?.path[0],
              message: error?.message || "Invalid Input",
            });
          });
          setEmail("");
          setPassword("");
          setError(null);
        } else {
          setError({
            path: errors?.path[0],
            message: errors?.message || "Invalid Input",
          });
        }
      }

      router.replace("/dashboard");
      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
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
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </Label>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
        </div>
      </div>

      <Button type="submit" className="w-full h-11 font-medium">
        {loading ? "Loading..." : "Sign In"}
      </Button>
    </form>
  );
}
