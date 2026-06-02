// This component allows to protect routes by not authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export default function IsAuthenticated({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/authentication/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

  return children;
}