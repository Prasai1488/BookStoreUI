import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const API_BASE = getBaseUrl();

  // Register user
  const registerUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axios.post(`${API_BASE}/auth/register`, {
      name,
      email,
      password,
    });
    return res.data;
  };

  // Login user
  const loginUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password,
    });

    const { token, user } = res.data;

    const fullUser = {
      ...user,
      token,
    };

    setCurrentUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));

    return fullUser;
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      console.log("✅ Loaded user from localStorage:", parsed); // ✅ ADD HERE
      setCurrentUser(parsed);
    } else {
      console.log("❌ No user found in localStorage.");
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
