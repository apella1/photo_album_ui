import { client } from "@/lib/axios";
import { DBUser } from "@/types/user";
import { useState, useEffect } from "react";

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DBUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await client.get("get_user");

        if (response.status !== 200) {
          throw new Error("Invalid token or unauthorized");
        }

        const userData = response.data;
        setIsAuthenticated(true);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  return { isAuthenticated, user };
}
