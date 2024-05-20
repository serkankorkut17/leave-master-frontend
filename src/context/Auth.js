import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { loginAPI, registerAPI } from "../services/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  // const [userInfo, setUserInfo] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   imageUrl: 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  // });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
    }
    setIsReady(true);
  }, []);

  const signup = async (firstName, lastName, email, startDate, password, confirmPassword) => {
    // console.log(firstName, lastName, email, startDate, password, confirmPassword);
    try {
      const response = await registerAPI(firstName, lastName, email, startDate, password, confirmPassword);
      if (response) {
        toast.success("Signup successful");
        console.log(response.data);
        navigate("/login");
      }
      else {
        toast.warning("Email already exists! Please login.");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  }

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
        toast.success("Login successful");
        navigate("/");
      }
      else {
        toast.warning("Invalid email or password! Please try again.");
      }
    } catch (error) {
      console.log(error);
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
    <AuthContext.Provider value={{ user, token, signup, login, logout, isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
