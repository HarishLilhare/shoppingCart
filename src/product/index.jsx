
 
import React, { useState, useEffect } from "react";
import '../product/index.css'

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function Product() {
  const [cart, setCart] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  const addToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: {
        ...product,
        qty: (prevCart[product.id]?.qty || 0) + 1,
      },
    }));
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) => {
      if (!prevCart[id]) return prevCart;

      const newQty = prevCart[id].qty + change;
      if (newQty > 0) {
        return {
          ...prevCart,
          [id]: { ...prevCart[id], qty: newQty },
        };
      } else {
        const newCart = { ...prevCart };
        delete newCart[id];
        return newCart;
      }
    });
  };

  useEffect(() => {
    let total = Object.values(cart)
      .filter((item) => item.id !== FREE_GIFT.id)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    setSubtotal(total);
  }, [cart]);

  useEffect(() => {
    setCart((prevCart) => {
      if (subtotal >= THRESHOLD && !prevCart[FREE_GIFT.id]) {
        return { ...prevCart, [FREE_GIFT.id]: { ...FREE_GIFT, qty: 1 } };
      }
      if (subtotal < THRESHOLD && prevCart[FREE_GIFT.id]) {
        const newCart = { ...prevCart };
        delete newCart[FREE_GIFT.id];
        return newCart;
      }
      return prevCart;
    });
  }, [subtotal]);

 const getProgressBarColor = () => {
   if (subtotal >= THRESHOLD) return "#007bff";
  if (subtotal >= 500) return "#007bff";
   return "#007bff";
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="products">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <p>{product.name}</p>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

    
      <h2>Subtotal: ₹{subtotal}</h2>

      {subtotal < THRESHOLD ? (
        <>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${(subtotal / THRESHOLD) * 100}%`,
                backgroundColor: getProgressBarColor(),
              }}
            ></div>
          </div>
          <p>Add ₹{THRESHOLD - subtotal} more to get a free Wireless Mouse! </p>
        </>
      ) : (
        <p> You got a free Wireless Mouse! </p>
      )}

      
      {Object.keys(cart).length === 0 ? ( <div>
        <h2>Your Cart is empty...</h2>
        <p> Add Some products to see them here !</p> 
        </div>
      ) : (
        <ul className="cart">
          {Object.values(cart).map((item) => (
            <li key={item.id} className="cart-item">
              {item.name} - ₹{item.price} x {item.qty} = ₹{item.price * item.qty}
             {item.id === FREE_GIFT.id ? (
            <span className="free-gift"> FREE GIFT</span>
         ) : (
       <div>
    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
    <span>{item.qty}</span>
    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
    </div>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Product;
