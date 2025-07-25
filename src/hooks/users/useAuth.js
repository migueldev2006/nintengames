import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

export function useAuth({ redirectIfUnauthenticated = true } = {}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // o usa cookies si prefieres

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (redirectIfUnauthenticated) {
        router.push("/login");
      }
    }

    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
}
