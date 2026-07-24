// This component allows to protect routes by not authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";

export default function IsAuthenticated({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/authentication/login");
    }
  }, [user, loading, router]);

  if (!user) return null;

  if(!loading && user && user.status === "superuser"){
      setTheme(user.theme)
      return children;
  }
}