import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Likes from "../../UI/Likes";
import styled from "styled-components";
import Skeleton from "../../UI/Skeleton";

const GET_COCKTAIL_BY_ID = gql`
  query GetCocktailDetail($drinkId: String!) {
    getCocktailById(drinkId: $drinkId) {
      idDrink
      strCategory
      strInstructions
      strAlcoholic
      strDrink
      strDrinkThumb
      strIngredient1
      strIngredient2
      strIngredient3
      strIngredient4
      strIngredient5
      strGlass
    }
  }
`;

const Cocktail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COCKTAIL_BY_ID, {
    variables: {
      drinkId: id,
    },
  });
  const [presentLike, setPresentLike] = useState(false);
  const detailData = data?.getCocktailById[0];

  useEffect(() => {
    const likeList = JSON.parse(localStorage.getItem("likes"));
    if (likeList && likeList.includes(id)) {
      setPresentLike(true);
    }
  }, [id]);

  if (error) return <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <Container>
          <Img src={detailData.strDrinkThumb} alt={detailData.strDrink} />
          <Info>
            <BtnWrap>
              <Likes id={detailData.idDrink} isLiked={presentLike} />
            </BtnWrap>
            <h1>{detailData.strDrink}</h1>
            <h2>{detailData.strInstructions}</h2>
            <List>
              <h3>category</h3>
              <p>{detailData.strCategory}</p>
            </List>
            <List>
              <h3>alcoholic</h3>
              <p>{detailData.strAlcoholic}</p>
            </List>
            <List>
              <h3>Ingredient</h3>
              <p>
                <span>{detailData.strIngredient1}</span>
                <span>{detailData.strIngredient2}</span>
                <span>{detailData.strIngredient3}</span>
                <span>{detailData.strIngredient4}</span>
                <span>{detailData.strIngredient5}</span>
              </p>
            </List>
            <List>
              <h3>Glass</h3>
              <p>{detailData.strGlass}</p>
            </List>
          </Info>
        </Container>
      )}
    </>
  );
};

export default Cocktail;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  padding-top: 3rem;
  display: flex;
  justify-content: flex-start;
`;

const Img = styled.img`
  max-width: 40%;
  height: 600px;
  overflow: hidden;
  object-fit: cover;
`;
const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 60%;
  padding-left: 2rem;
  color: #101b45;

  h1 {
    padding-bottom: 1.2rem;
    color: #101b45;
    font-size: 3rem;
    font-weight: 800;
  }

  h2 {
    padding-bottom: 1rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.3px;
    line-height: 1.2;
  }
`;

const BtnWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const List = styled.div`
  padding: 1rem 0;
  border-top: 1px solid #ddd;

  h3 {
    color: #101b45;
    padding-bottom: 0.6rem;
  }

  p {
    color: #999;
  }
`;
