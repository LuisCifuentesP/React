import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useContext(CartContext)
    const { id, name, img, price, ingredients, desc } = pizza
  return (
    <div className="card container">
      <img className = "border rounded" src= {img} alt={name} />
        <h2 className='text-start fs-3 fw-bold m-2 text-capitalize'>{name}</h2>
        <hr />

        <h6>🍕Ingredientes:</h6>
        
        <ul className="list-unstyled text-capitalize">
          {ingredients.map((ingredient, index) => (
            <li key = {index}>{ingredient}</li>
          ))}
        </ul>
        
        {/* <hr /> */}

        {/*<p className="card-text">{desc}</p>*/}
        <hr />

        <p className='fs-4 fw-bold'>Precio: ${price.toLocaleString()}</p>
        <div className='botones-card'>
          <Link to={`/pizza/${id}`} className="btn btn-info">
              Ver más 👀
          </Link>
            <button className='bg-dark text-white border rounded'
            onClick={() => addToCart({ id, name, img, price })}>Añadir 🛒</button>
        </div> 
    </div>
  );
};

export default CardPizza;
