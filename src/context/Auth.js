import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  loginAPI,
  registerAPI,
  resetPasswordRequestAPI,
  resetPasswordAPI,
} from "../services/AuthService";
import { getRoleAPI } from "../services/AdminService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  // const [userInfo, setUserInfo] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   imageUrl: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  // });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
    }
    if (storedRole) {
      setRole(storedRole);
    }
    setIsReady(true);
  }, []);


  const signup = async (
    firstName,
    lastName,
    email,
    employeeRole,
    code,
    password,
    confirmPassword
  ) => {
    // console.log(firstName, lastName, email, startDate, password, confirmPassword);
    try {
      const response = await registerAPI(
        firstName,
        lastName,
        email,
        employeeRole,
        code,
        password,
        confirmPassword
      );
      if (response.status === 400) {
        toast.warning(response.data);
      }
      else if (response.statusText === "OK") {
        toast.success("Signup successful");
        console.log(response.data);
        navigate("/login");
      } else {
        toast.warning(response.data);
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      console.log("response", response);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          imageUrl:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        try {
          const response = await getRoleAPI();
          if (response) {
            setRole(response.data);
            localStorage.setItem("role", response.data); // Store the role in localStorage
          }
        } catch (error) {
          console.error("Failed to fetch role:", error);
        }
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.warning("Invalid email or password! Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.warning("Server error occurred");
    }
  };

  const resetPasswordRequest = async (email) => {
    try {
      const response = await resetPasswordRequestAPI(email);
      if (response) {
        toast.success("Password reset request successful");
      } else {
        toast.warning("Email not found! Please try again.");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  const resetPassword = async (token, email, password, confirmPassword) => {
    try {
      const response = await resetPasswordAPI(
        token,
        email,
        password,
        confirmPassword
      );
      if (response) {
        toast.success("Password reset successful");
        navigate("/login");
      } else {
        toast.warning("Password reset failed! Please try again.");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        signup,
        login,
        logout,
        resetPassword,
        resetPasswordRequest,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
