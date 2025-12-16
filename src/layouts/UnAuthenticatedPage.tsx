"use client";
import React, { ReactNode, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type PropsType = {
  children: ReactNode;
};

const UnAuthenticatedPage = ({ children }: PropsType) => {
  const router = useRouter();
  // const { data: session, status } = useSession({ required: true });
  // useEffect(() => {
  //   if (session?.accessToken && status !== "loading") {
  //     router?.replace("/dashboard");
  //     router?.refresh();
  //   }
  // }, [status]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    handleAuthentication();
  }, []);

  async function handleAuthentication() {
    try {
      const session = await getSession();
      console.log({ session });
      if (session) {
        router?.replace("/dashboard");
        router?.refresh();
      }
    } catch (error) {
    } finally {
      // setLoading(false);
    }
  }

  return (
    <div>
      {children}
      {/* {loading && <LoadingConver />} */}
    </div>
  );
};

export default UnAuthenticatedPage;
