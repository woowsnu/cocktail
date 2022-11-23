import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

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
      isLiked @client
    }
  }
`;

const Cocktail = () => {
  const { id } = useParams();
  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(GET_COCKTAIL_BY_ID, {
    variables: {
      drinkId: id,
    },
  });

  const detailData = data?.getCocktailById[0];

  if (loading) return <div>Loading</div>;
  if (error) return <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;

  const handleLikes = () => {
    // apollo cache 에 접근
    cache.writeFragment({
      id: `Roo:${id}`,
      fragment: gql`
        fragment cocktailFragment on GetCocktailById {
          isLiked
        }
      `,
      data: {
        isLiked: !detailData.idLiked,
      },
    });
  };

  return (
    <Container>
      <Img
        src={detailData.strDrinkThumb}
        alt={detailData.strDrink}
      />
      <Info>
        {/* <a href="#">다시 추천받기</a> */}
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
          <h3>category</h3>
          <p>{detailData.strCategory}</p>
        </List>
        {/* <AiOutlineRetweet /> */}
      </Info>
    </Container>
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



