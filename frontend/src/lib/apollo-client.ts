import { ApolloClient, InMemoryCache } from "@apollo/client";
import "dotenv/config";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        books: {
          keyArgs: false,

          merge(existing, incoming) {
            const merged = existing ? existing.books.slice(0) : [];
            return {
              books: [...merged, ...incoming.books],
              last: incoming.last,
              totalCount: existing ? existing.totalCount : incoming.totalCount,
            };
          },
        },
        authors: {
          keyArgs: false,

          merge(existing, incoming) {
            const merged = existing ? existing.authors.slice(0) : [];
            return {
              authors: [...merged, ...incoming.authors],
              last: incoming.last,
              totalCount: existing ? existing.totalCount : incoming.totalCount,
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: cache,
});

export default client;
