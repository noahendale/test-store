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
  const [onlyShowFavs, setOnlyShowFavs] = useState(false)
  const apiEndpoint = 'https://fakestoreapi.com/products'

  const fetchProducts = async () => {
    try {
      const res = await fetch(apiEndpoint)

      if (!res.ok) throw new Error('Failed to fetch products')

      const data = await res.json();

      return setProducts(data)
    } catch (error) {
      console.error('Error fetching products: ', error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // show all products if search field is empty
    if (!searchValue) return fetchProducts()

    try {
      const response = await fetch(`${apiEndpoint}/category/${searchValue}`)
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json()

      setProducts(data)

      return data
    } catch (error) {
      console.error('Error', error)
      throw error
    }
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
          />
          <button type='submit'>Search</button>
        </form>
      </header>
      <label htmlFor="onlyShowFavs">Favourites</label>
      <input type="checkbox" id='onlyShowFavs' onClick={() => setOnlyShowFavs(!onlyShowFavs)}/>
      <StyledMain>
        {products.length < 1 ? <p>No matching products, sorry</p> : <Product productList={products} onlyShowFavs={onlyShowFavs}/>}
      </StyledMain>
    </StyledApp>
  );
}

export default App;
