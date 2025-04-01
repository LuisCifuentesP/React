import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { validateLogin } from "../utils/vailidator";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [errores, setErrores] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Función para autenticar usuario generando un token
  const auth = async (email, password) => {
    try {
      const URL = "http://localhost:5000/api/auth/login";
      const payload = { email, password };

      const user = await axios.post(URL, payload);
      localStorage.setItem("token", user.data.token);
      setToken(user.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el inicio de sesión
  const applyLogIn = async (email, password) => {
    const validForm = validateLogin({ email, password }, setErrores);

    if (validForm) {
      await auth(email, password);
      await fetchUser();
    } else {
      console.log("Errores de validación", errores);
    }
  };

  // Función para manejar cierre de sesión
  const applyLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
  };

  // Función para registrarse
  const applyRegister = async (email, password) => {
    try {
      const URL = "http://localhost:5000/api/auth/register";
      const payload = { email, password };

      const user = await axios.post(URL, payload);
      localStorage.setItem("token", user.data.token);
      setToken(user.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  // Función para autenticar el perfil del usuario
  const fetchUser = async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        errores,
        setErrores,
        applyLogIn,
        applyLogOut,
        applyRegister,
        fetchUser,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;