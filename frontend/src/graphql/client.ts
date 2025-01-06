import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // URL de ton backend
  cache: new InMemoryCache(),
});

export default client;

