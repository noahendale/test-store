import React, { useEffect, useState } from 'react';
import './App.css';

interface ProductInterface {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  }
  title: string;
}

function App() {
  const [products, setProducts] = useState([])

  const fetchProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="App">
      <header>
        <h1>My Store</h1>
      </header>
      <main style={{display: 'flex', flexWrap: 'wrap'}}>
      {products.map((product: ProductInterface) => {
        const {title, image, price, id} = product
        return (
          <div key={id} style={{width:'33%'}}>
            {/* {console.log(product)} */}
            <h3>{title}</h3>
            <img src={image} alt={title} style={{maxWidth:'100%'}} />
            <p>${price}</p>
          </div>
        )})}
      </main>
    </div>
  );
}

export default App;
