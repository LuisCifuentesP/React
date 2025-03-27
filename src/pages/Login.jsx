import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import { validateLogin } from "../utils/vailidator";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { applyLogIn, errores, setErrores } =
    useContext(UserContext);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: ""})

    //Función para manejar inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValido = validateLogin(formData, setErrores);

    if (formValido) {
      try {
        await applyLogIn(formData.email, formData.password);
        
        Swal.fire({
          title: "Inicio de sesión completado",
          icon: "success",
          draggable: true,
        });

        navigate('/');
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo iniciar sesión. Verifica tus credenciales.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }

  };

  //Función para mostrar mensajes de error
  const getErrorMessage = (field) => {
    const error = errores.find((err) => err.campo === field);
    return error ? error.mensaje : null;
  };

  //Función para manejar el cambio en los estados de los input
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value || "",
    }));
  };

  return (
    <section className="register-container container-fluid">
      <div className="register">
        <h2 className="text-center">Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <h4>Email</h4>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              className={`form-control ${
                getErrorMessage("email") ? "is-invalid" : ""
              }`}
              placeholder="example@example"
              onChange={handleChange}
            />
            {getErrorMessage("email") && (
              <div className="invalid-feedback">{getErrorMessage("email")}</div>
            )}
          </div>

          <h4>Contraseña</h4>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              className={`form-control ${
                getErrorMessage("password") ? "is-invalid" : ""
              }`}
              placeholder="Introduce tu contraseña"
              onChange={handleChange}
            />
            {getErrorMessage("password") && (
              <div className="invalid-feedback">
                {getErrorMessage("password")}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
