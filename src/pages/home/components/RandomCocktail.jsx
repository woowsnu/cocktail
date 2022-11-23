import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const RANDOM_COCKTAIL = gql`
  query randomCocktial {
    randomCocktail {
      idDrink
      strDrink
      strCategory
      strAlcoholic
      strDrinkThumb
      strInstructions
    }
  }
`;

const RandomCocktail = () => {
  const { data, loading, error } = useQuery(RANDOM_COCKTAIL);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <Container>
      <Img
        src={data?.randomCocktail[0].strDrinkThumb}
        alt={data?.randomCocktail[0].strDrink}
      />
      <Info>
        {/* <a href="#">다시 추천받기</a> */}
        <h1>{data?.randomCocktail[0].strDrink}</h1>
        <h2>{data?.randomCocktail[0].strInstructions}</h2>
        <List>
          <h3>category / alcoholic</h3>
          <p>{data?.randomCocktail[0].strCategory} | {data?.randomCocktail[0].strAlcoholic}</p>
        </List>
        <List>
          <h3>category</h3>
          <p>{data?.randomCocktail[0].strAlcoholic}</p>
        </List>
        <List>
          <h3>category</h3>
          <p>{data?.randomCocktail[0].strCategory}</p>
        </List>
        <List>
          <h3>category</h3>
          <p>{data?.randomCocktail[0].strCategory}</p>
        </List>
        {/* <AiOutlineRetweet /> */}
      </Info>
    </Container>
  );
};

export default RandomCocktail;

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
