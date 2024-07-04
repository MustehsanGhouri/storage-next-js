"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";

const withAuth = <P extends {}>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const AuthComponent = (props: P) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/api/auth/signin");
      }
    }, [status, router]);

    if (status === "authenticated") {
      return <Component {...props} />;
    }

    return null;
  };

  return AuthComponent;
};

export default withAuth;
