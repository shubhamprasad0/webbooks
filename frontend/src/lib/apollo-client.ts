import { ApolloClient, InMemoryCache } from "@apollo/client";
import "dotenv/config";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
});

export default client;
