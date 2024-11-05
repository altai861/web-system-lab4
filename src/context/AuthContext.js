import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Axios for making HTTP requests

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInformation, setUserInformation] = useState(null);
  const [users, setUsers] = useState([]); // State to store users

  // Load user info from localStorage when the app starts
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem("userInformation");
    if (savedAuthStatus) {
      setUserInformation(JSON.parse(savedAuthStatus)); // Parse stored user info from string to object
    }
    getUsers();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3500/api/users/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userInformation", JSON.stringify(response.data.user)); // Save user info
        setUserInformation(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUserInformation(null);
    localStorage.removeItem("userInformation");
  };

  // Register function
  const register = async (email, password, image, name) => {
    try {
      const response = await axios.post("http://localhost:3500/api/users/signup", {
        email,
        password,
        image,
        name,
      });

      if (response.data.success) {
        return [true, "Амжилттай бүртгүүллээ"]; // "Successfully registered"
      } else {
        return [false, "Email давхардаж байна."]; // "Email already exists"
      }
    } catch (error) {
      console.error("Registration failed:", error);
      return [false, "Registration error."];
    }
  };

  // Get all users function
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3500/api/users"); // Assuming the endpoint is /api/users
      setUsers(response.data); // Store the users in state
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  return (
    <AuthContext.Provider value={{ userInformation, login, logout, register, getUsers, users }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext in other components
export const useAuth = () => useContext(AuthContext);
