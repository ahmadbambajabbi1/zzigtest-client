import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import UnAuthenticatedPage from "@/layouts/UnAuthenticatedPage";

export default function SignupPage() {
  return (
    <UnAuthenticatedPage>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2 text-balance">
              Create an account
            </h1>
            <p className="text-muted-foreground text-balance">
              Get started with your free account today
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <SignupForm />

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="font-medium text-foreground hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </UnAuthenticatedPage>
  );
}
