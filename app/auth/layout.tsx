"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

interface AuthRoutesProps {
  children: React.ReactNode;
}

const AuthRoutesLayout = ({ children }: AuthRoutesProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setIsLoading(false);
  }, [router]);

  return <>{isLoading ? <Loading /> : children}</>;
};

export default AuthRoutesLayout;
