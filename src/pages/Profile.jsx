import React, { useContext } from "react";
import profileImage from "../assets/img/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { userData, applyLogOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    applyLogOut();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column align-items-center w-50 border rounded"
      style={{ backgroundColor: "#e9e9e9" }}
    >
      <h3 className="w-100 text-white bg-dark rounded">Perfil de Usuario</h3>
      <img
        src={profileImage}
        alt="Foto de perfil"
        className="w-25 rounded-circle border border-dark"
      />

      <h5
        className="d-flex align-items-center justify-content-center mt-3 w-75 border border-info rounded bg-white p-3"
        style={{ height: "35px" }}
      >
        Nombre: Nombre de Usuario
      </h5>

      <h5
        className="d-flex align-items-center justify-content-center mt-2 w-75 border border-info rounded bg-white p-3"
        style={{ height: "35px" }}
      >
        Email: {userData?.email || "No disponible"}
      </h5>
      <button className="btn btn-danger w-75 m-4"
      onClick={handleLogOut}>
        Cerrar sesión
      </button>

    </div>
  );
};

export default Profile;
