import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Cocktail {
    idDrink: String!
    strDrink: String!
    strTags: String!
    strCategory: String!
    strIBA: String!
    strAlcoholic: String!
    strGlass: String!
    strInstructions: String!
    strDrinkThumb: String!
    strIngredient1: String
    strIngredient2: String
    strIngredient3: String
    strIngredient4: String
    strIngredient5: String
    strMeasure1: String
    strMeasure2: String
    strMeasure3: String
    strMeasure4: String
    strMeasure5: String
    strImageSource: String!
    strImageAttribution: String!
    strCreativeCommonsConfirmed: String!
    dateModified: String!
  }
  type Query {
    getCocktailsByName(name: String!): [Cocktail!]!
    getCocktailById(drinkId: String!): [Cocktail]
    randomCocktail: [Cocktail]
  }
`;

const resolvers = {
  Query: {
    getCocktailsByName(_, { name }) {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      )
        .then((res) => res.json())
        .then((data) => data.drinks);
    },
    getCocktailById(_, { drinkId }) {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      )
        .then((res) => res.json())
        .then((data) => data.drinks);
    },
    randomCocktail() {
      return fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data) => data.drinks);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Running on ${url}`);
});
