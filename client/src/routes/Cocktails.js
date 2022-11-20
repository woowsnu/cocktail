import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const COCKTAILS_BY_NAME = gql`
  query getCocktailsByName {
    searchCocktailByName(name: "Margarita") {
      idDrink
      strCategory
      strAlcoholic
    }
  }
`;

const Cocktails = () => {
  const { data, loading, error } = useQuery(COCKTAILS_BY_NAME);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <ul>
      {data.searchCocktailByName.map((cocktail) => (
        <li key={cocktail.idDrink}>
          <Link to={`/${cocktail.idDrink}`}>{cocktail.strCategory}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Cocktails;

// const [Cocktails, setCocktails] = useState([]);
// const client = useApolloClient();
// useEffect(() => {
//   client
//     .query({
//       query: gql``,
//     })
//     .then((result) => setCocktails(result.data.searchCocktailByName));
// }, []);
