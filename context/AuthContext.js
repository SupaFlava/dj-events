import { createContext, useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => checkUserLogginIn(), []);

  // Register User
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };
  //Login User
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setError(data.message);
      setError(null);
    }
  };
  //Logout User
  const logout = async (user) => {
    const res = await fetch(`${NEXT_URL}/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };
  //check login user
  const checkUserLogginIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
