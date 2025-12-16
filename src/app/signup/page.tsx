import Link from "next/link";
import { SignupForm } from "@/components/signup-form";
import UnAuthenticatedPage from "@/layouts/UnAuthenticatedPage";

export default function SignupPage() {
  return (
    <UnAuthenticatedPage>
      <SignupForm />
    </UnAuthenticatedPage>
  );
}
