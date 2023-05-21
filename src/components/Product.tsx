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
  width: calc(50% - 20px);
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 640px) {
    width: calc(33% - 20px);
  }

  img {
    max-width: 100%;
    height: auto;
    aspect-ratio: 4/3;
  }
`

const Product = ({productList}: ProductListInterface) => (
  <>
    {productList.map((product: ProductInterface) => {
      const {title, image, price, id} = product
      return (
        <ProductContainer
          key={id}
          className='app__product-container'
        >
          <h3>{title}</h3>
          <img
            src={image}
            alt={title}
          />
          <p>${price}</p>
        </ProductContainer>
      )}
    )}
  </>
)

export default Product
