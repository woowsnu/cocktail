import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COCKTAIL_BY_ID = gql`
  query getCocktailDeatil($searchCocktailByIdId: String!) {
    searchCocktailById(id: $searchCocktailByIdId) {
      idDrink
      strCategory
      strAlcoholic
      strDrink
      strDrinkThumb
    }
  }
`;

const Cocktail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_COCKTAIL_BY_ID, {
    variables: {
      searchCocktailByIdId: id,
    },
  });

  console.log(data)

  if (loading) return <div>Loading</div>;
  if (error) return <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>;
  
  return (
    <div>
      <div>{data.searchCocktailById[0].idDrink}</div>
      <div>{data.searchCocktailById[0].strCategory}</div>
      <div>{data.searchCocktailById[0].strAlcoholic}</div>
      <div>{data.searchCocktailById[0].strDrink}</div>
      <img src={data.searchCocktailById[0].strDrinkThumb}/>
    </div>
  );
};

export default Cocktail;
