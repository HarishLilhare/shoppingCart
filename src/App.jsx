import React from "react";
import ProductList from "./product/index"; 
import "./app.css"
function App() {
  return (
    <div className="contrainer">
      <h1 className="shopping"> Shopping Cart </h1>
      <ProductList />
    </div>
  );
}

export default App;
