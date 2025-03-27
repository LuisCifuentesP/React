import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { validateLogin } from "../utils/vailidator";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [errores, setErrores] = useState([]);

  //Función para autentificar usuario generando un token
  const auth = async (email, password) => {
    try {
      const URL = "http://localhost:5000/api/auth/login";
      const payload = { email, password };

      const user = await axios.post(URL, payload);
      console.log("user", user);
      localStorage.setItem("token", user.data.token); //guarda en el almacenamiento local

      console.log("user", user.data);
    } catch (error) {
      console.error(error);
    }
  };
  //Función para manejar el inicio de sesión
  const applyLogIn = async (email, password) => {

    //Validar el formulario
    const validForm = validateLogin( { email, password }, setErrores);

    if (validForm) {
      await auth(email, password);
      await fetchUser();
    } else {
      console.log("Errores de validación", errores);
    }
  };

  //Función para manejar cierre de sesión
  const applyLogOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  //Función para registrarse
  const applyRegister = async (email, password) => {
    try {
      const URL = "http://localhost:5000/api/auth/register";
      const payload = { email, password };

      const user = await axios.post(URL, payload);
      console.log("user", user);
      localStorage.setItem("token", user.data.token); //guarda en el almacenamiento local

      console.log("user", user.data);
    } catch (error) {
      console.error(error);
    }
  };

  //Función para autentificar el perfil del usuario
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        setUserData(res.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setUserData(null);
    }
  };

  //Llama la función fetchUser cuando se monta el componente
  useEffect(() => {
    fetchUser();
  }, []);

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

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
