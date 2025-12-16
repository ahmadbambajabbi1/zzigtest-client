"use client";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type PropsType = {
  children: ReactNode;
};

const AuthenticatedPage = ({ children }: PropsType) => {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    handleAuthentication();
  }, []);

  async function handleAuthentication() {
    try {
      const session = await getSession();
      if (!session) {
        localStorage.clear();
        await signOut({ redirect: true, callbackUrl: "/login" });
      }
    } catch (error) {
      localStorage.clear();
      await signOut({ redirect: true, callbackUrl: "/login" });
    }
  }
  return children;
};

export default AuthenticatedPage;
