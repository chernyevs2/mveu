import './Product.css';
import React from 'react';

function Product({header, image, price}) {
  return (
    <div className="Product">
      <img src={image}/>
      <h1>{header}</h1>
      <p>{` ${price} руб`}</p>
      <button>В корзину</button>
    </div>
  );
}

export default Product;