import React from "react";
import styled from '@emotion/styled'

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

interface ProductListInterface {
  productList: ProductInterface[];
}

const ProductContainer = styled.div`
  width: calc(50% - 1rem);
  margin: 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (min-width: 640px) {
    width: calc(33% - 1rem);
  }

  h3 {
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    margin: 1rem 0;
  }
`

const ImageContainer = styled.div`
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Product = ({productList}: ProductListInterface) => (
  <>
    {productList.map((product: ProductInterface) => {
      const {title, image, price, id} = product

      // Different number formats coming from API so I'm formating everything here
      const CADollar = new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
      })

      return (
        <ProductContainer
          key={id}
          className='app__product-container'
        >
          <ImageContainer>
            <img
              src={image}
              alt={title}
            />
          </ImageContainer>
          <h3>{title}</h3>
          <p>{CADollar.format(price)}</p>
        </ProductContainer>
      )}
    )}
  </>
)

export default Product
