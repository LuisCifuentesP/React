import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const { idPizza } = useParams()
  const [pizzasById, setPizzasById] = useState({});
  const { addToCart } = useContext(CartContext)

  const getPizzaById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${idPizza}`);

      if (!response.ok) {
        throw new Error(`HTTP ERROR! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setPizzasById(data);
    } catch (error) {
      console.log("Error al cargar los datos de la pizza: ", error);
    }
  };

  useEffect(() => {
    getPizzaById();
  }, []);

  return (
    <div
      className="container mt-4 d-flex p-2 gap-3"
      style={{ border: "1px solid lightgrey" }}
    >
      <img
        src={pizzasById.img}
        alt={pizzasById.name}
        style={{ borderRadius: "5px", width: "500px", height: "auto" }}
      />

      <div className="d-flex flex-column">
        <h3 className="text-capitalize">{pizzasById.name}</h3>
        <p>{pizzasById.desc}</p>

        <h5>Ingredientes:</h5>
        <ul>
          {pizzasById.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-capitalize list-unstyled">
              🍕{ingredient}
            </li>
          ))}
        </ul>

        <div className="d-flex justify-content-around">
        <h4>Precio: ${pizzasById.price ? pizzasById.price.toLocaleString() : 'Cargando...'}</h4>
        <button className="bg-dark text-white border rounded" 
        onClick={() => addToCart(pizzasById)}>Añadir 🛒</button>
        </div>

      </div>
    </div>
  );
};

export default Pizza;
