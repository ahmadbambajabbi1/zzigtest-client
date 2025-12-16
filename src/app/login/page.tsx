import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import UnAuthenticatedPage from "@/layouts/UnAuthenticatedPage";

export default function LoginPage() {
  return (
    <UnAuthenticatedPage>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2 text-balance">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-balance">
              Sign in to your account to continue
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <LoginForm />

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="font-medium text-foreground hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnAuthenticatedPage>
  );
}
