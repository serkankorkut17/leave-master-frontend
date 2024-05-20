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

    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    //   setUserInfo({
    //     firstName: 'Serkan',
    //     lastName: 'Korkut',
    //     email: 'serkankorkut@gmail.com',
    //     imageUrl:
    //       'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    //   });
    // }
  }, []);

  const signup = async (email, password, firstName, lastName) => {
    try {
      const response = await registerAPI(email, password, firstName, lastName);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          imageUrl:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);
        toast.success("Signup successful");
        navigate("/");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
  }

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      if (response) {
        localStorage.setItem("token", response.data.token);
        const userObj = {
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          imageUrl:
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(response.data.token);
        setUser(userObj);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error) {
      toast.warning("Server error occurred");
    }
    // setUser(userData);
    // localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
    // setUser(null);
    // localStorage.removeItem("user");
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
