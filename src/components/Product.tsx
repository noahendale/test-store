import React, { useEffect, useState } from "react";
import styled from '@emotion/styled'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

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
  onlyShowFavs: boolean;
}

const ProductContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 10px;

  @media (min-width: 360) {
    width: calc(50% - 3rem);
  }

  @media (min-width: 640px) {
    width: calc(33% - 3rem);
  }

  h4 {
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
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

const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  &.border {
    border: 1px solid black;
  }

  &.favourite {
    text-align: left;
    width: max-content;
    transition: color 0.2s;
    color: #e92d2d;
  }
`

const DescriptionParagraph = styled.p`
  transition: all 0.2s;
  opacity: 0;
  max-height: 0;

  &.visible {
    opacity: 1;
    max-height: 10rem;
  }
`

const Product = ({ productList, onlyShowFavs }: ProductListInterface) => {
  const [showDescriptions, setShowDescriptions] = useState(
    productList.map(() => false)
  );

  const [favourites, setFavourites] = useState(() => {
    // check if anything in localstorage before initializing state
    const storedFavourites = localStorage.getItem('favourites')
    if (storedFavourites !== null) return JSON.parse(storedFavourites)
    return []
  })

  useEffect(() => {
    //update localstorage whenever favourites changes
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  const toggleDescription = (index: number) => {
    setShowDescriptions((prevState) => {
      // make a copy of current state and toggle the state of 
      // the passed in index
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const toggleFavourite = (id: number) => {
    setFavourites((prevState: number[]) => {
      const newState = [...prevState];
      const idIndex = newState.indexOf(id)

      idIndex === -1 ? newState.push(id) : newState.splice(idIndex, 1)
      return newState;
    })
  }

  return (
    <>
      {productList.map((product: ProductInterface, index: number) => {
        const { title, image, price, id, description } = product;
        // skip product if 'Favourites' is checked and product hasn't been favourited
        if (favourites?.indexOf(id) === -1 && onlyShowFavs) return null

        const CADollar = new Intl.NumberFormat('en-CA', {
          style: 'currency',
          currency: 'CAD',
        });

        return (
          <ProductContainer
            key={id}
            className="app__product-container"
            tabIndex={0}
          >
            <StyledButton className='favourite' onClick={() => toggleFavourite(id)}>
              {favourites?.indexOf(id) === -1 ? <FavoriteBorderIcon /> : <FavoriteIcon/>}
            </StyledButton>
            <ImageContainer>
              <img src={image} alt={title} />
            </ImageContainer>
            <h4>{title}</h4>
            <StyledButton onClick={() => toggleDescription(index)} className='border'>
              {showDescriptions[index] ? 'Hide' : 'Show More'}
            </StyledButton>
            <DescriptionParagraph className={showDescriptions[index] ? 'visible' : ''}>{description}</DescriptionParagraph>
            <p>{CADollar.format(price)}</p>
          </ProductContainer>
        );
      })}
    </>
  );
};

export default Product
