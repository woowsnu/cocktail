import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import SearchResultItem from "../search/SearchResultItem";
import Pagination from "../../UI/Pagination";
import Loading from "../../UI/Loading";

const GET_COCKTAIL_BY_IDS = gql`
  query GetCocktailsDetail($drinkId: [String!]!) {
    getCocktailByIds(drinkId: $drinkId) {
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

const MyCocktail = () => {
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [listUpdate, setListUpdate] = useState(false);
  const LikeArr = JSON.parse(localStorage.getItem("likes"));

  const { data, loading, error } = useQuery(GET_COCKTAIL_BY_IDS, {
    variables: {
      drinkId: LikeArr,
    },
  });

  const LikeData = data?.getCocktailByIds;

  const handleUpdate = () => {
    setListUpdate(!listUpdate);
  }

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <Container>
      <h1>My Cocktail</h1>
      <Ul>
        {LikeData?.slice(offset, offset + limit).map((cocktail) => (
          <SearchResultItem
            key={cocktail.idDrink}
            cocktail={cocktail}
            isLiked={true}
            listUpdate={handleUpdate}
          />
        ))}
      </Ul>
      <PageWrap>
        <Pagination
          total={LikeData?.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </PageWrap>
    </Container>
  );
};

export default MyCocktail;

const Container = styled.div`
  width: 100%;
  padding-top: 1rem;

  h1 {
    text-align: center;
    font-weight: 800;
    padding-bottom: 1.4rem;
  }
`;

const Ul = styled.ul`
  max-width: 960px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem 0;
`;
