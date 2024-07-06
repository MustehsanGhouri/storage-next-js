import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const user = sessionStorage.getItem("username");
    setIsAuthenticated(!!token);
    setUsername(user);
  }, []);

  return { isAuthenticated, username };
}
