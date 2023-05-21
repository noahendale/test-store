import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Product from './components/Product.tsx';

const StyledApp = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`
const StyledMain = styled.main`
  display: flex;
  flex-wrap: wrap;
`

function App() {
  const [products, setProducts] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const apiEndpoint = 'https://fakestoreapi.com/products'

  const fetchProducts = () => {
    fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => setProducts(data))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const searchProducts = (category: string) => {
    const productsMatchingSearch = fetch(`${apiEndpoint}/category/${category}`)
      .then(res => res.json())
      .then(data => setProducts(data))

    return productsMatchingSearch
  }

  return (
    <StyledApp>
      <header>
        <h1>My Store</h1>
        <label htmlFor='search'>Search by Category (electronics, jewelery, men's clothing, women's clothing)</label>
        <input
          type='text'
          id='search'
          onChange={e => setSearchValue(e.target.value)}
        />
        <button onClick={() => searchProducts(searchValue)}>Search</button>
      </header>
      <StyledMain>
        {products.length < 1 ? <p>No matching products, sorry</p> : <Product productList={products}/>}
      </StyledMain>
    </StyledApp>
  );
}

export default App;
