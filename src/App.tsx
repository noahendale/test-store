import React, { FormEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Product from './components/Product.tsx';

const StyledApp = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`

const StyledHeader = styled.h1`
  font-family: 'Rubik', sans-serif;
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const productsMatchingSearch = fetch(`${apiEndpoint}/category/${searchValue}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProducts(data))

    return productsMatchingSearch
  }

  return (
    <StyledApp>
      <header>
        <StyledHeader>My Store</StyledHeader>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='search'>Search by Category (electronics, jewelery, men's clothing, women's clothing)</label>
          <input
            type='text'
            id='search'
            onChange={e => setSearchValue(e.target.value)}
            required
          />
          <button type='submit'>Search</button>
        </form>
      </header>
      <StyledMain>
        {products.length < 1 ? <p>No matching products, sorry</p> : <Product productList={products}/>}
      </StyledMain>
    </StyledApp>
  );
}

export default App;
