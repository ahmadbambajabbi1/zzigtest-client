import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import UnAuthenticatedPage from "@/layouts/UnAuthenticatedPage";

export default function LoginPage() {
  return (
    <UnAuthenticatedPage>
      <LoginForm />
    </UnAuthenticatedPage>
  );
}
