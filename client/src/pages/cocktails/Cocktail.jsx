import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COCKTAIL_BY_ID = gql`
  query GetCocktailDetail($drinkId: String!) {
    getCocktailById(drinkId: $drinkId) {
      idDrink
      strCategory
      strAlcoholic
      strDrink
      strDrinkThumb
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
    <div>
      <div>{detailData.idDrink}</div>
      <div>{detailData.strCategory}</div>
      <div>{detailData.strAlcoholic}</div>
      <div>{detailData.strDrink}</div>
      <img src={detailData.strDrinkThumb} alt={detailData.strDrink} />
      <button onClick={handleLikes}>
        {detailData.isLiked ? "unlike" : "like"}
      </button>
    </div>
  );
};

export default Cocktail;
