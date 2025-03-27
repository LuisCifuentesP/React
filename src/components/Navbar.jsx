  import React, { useContext } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { CartContext } from "../context/CartContext";
  import { UserContext } from "../context/UserContext";

  const Navbar = () => {
    const { cart } = useContext(CartContext);
    const { userData, applyLogOut } = useContext(UserContext);

    //Manejar cierre de sesión
    const navigate = useNavigate();
    const handleLogOut = () => {
      applyLogOut();
      navigate("/");
    }

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    //const token = true;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Pizzeria Mamma Mia
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white border border-white rounded mx-2"
                  to="/"
                >
                  🍕Home
                </Link>
              </li>

              { userData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white border border-white rounded mx-2"
                      to="/profile"
                    >
                      🔓Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link text-white border border-white rounded mx-2 btn btn-outline-danger"
                      onClick={handleLogOut}
                    >
                      🔒Logout
                    </button>
                  </li>
                </>

              ) : (

                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white border border-white rounded mx-2"
                      to="/login"
                    >
                      🔐Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white border border-white rounded mx-2"
                      to="/register"
                    >
                      🔐Register
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <Link to="/cart">
              <button className="btn border border-white text-white">
                🛒 Total: ${totalPrice.toLocaleString()}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
