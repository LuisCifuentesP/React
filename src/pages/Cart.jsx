import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, increment, decrement, total, checkOut } =
    useContext(CartContext);
  const { userData } = useContext(UserContext);

  //Función para manejar el pago
  const handleCheckOut = async () => {
    if (!userData) {
      Swal.fire({
        title: "Error",
        text: "Debes iniciar sesión para seguir con la compra.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await checkOut();
    } catch (error) {
      console.error("Error al procesar el pago:", error);      
      
    }

  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        cart.map((item) => (
          <div className="card mb-3 mx-auto w-50" key={item.id}>
            <div className="row g-0 align-items-center">
              <div className="col-3 d-flex justify-content-center">
                <img
                  src={item.img}
                  alt={item.name}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-5">
                <div className="card-body p-2">
                  <h6 className="card-title text-capitalize">{item.name}</h6>
                  <p className="card-text m-0">
                    Precio: ${(item.price * item.count).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <div className="btn-group d-flex align-items-center">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </button>
                  <span className="btn btn-light p-3">{item.count}</span>
                  <button
                    className="btn btn-outline-success"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="text-end mt-4">
        <h3>Total de la compra: ${total.toLocaleString()}</h3>
        {userData ? (
          <button className="btn btn-success m-2 btn-lg" onClick={handleCheckOut}>
            Pagar
          </button>
        ) : (
          <>
            <button className="btn btn-success m-2 btn-lg" disabled>
              Pagar
            </button>
            <p className="text-danger">
              <strong>Debes iniciar sesión para seguir con la compra</strong>
            </p>
            <Link to="/login" className="btn btn-primary mb-3">
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
