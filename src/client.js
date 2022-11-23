import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://today-cocktail.herokuapp.com/",
  cache: new InMemoryCache(),
  connectToDevTools: true,
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
