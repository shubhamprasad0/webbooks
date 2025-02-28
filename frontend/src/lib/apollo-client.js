import { ApolloClient, InMemoryCache } from "@apollo/client";
import "dotenv/config";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        books: {
          keyArgs: false,

          merge(existing, incoming, { readField }) {
            const merged = existing ? { ...existing.books } : {};
            incoming.books.forEach((book) => {
              merged[readField("id", book)] = book;
            });
            return {
              books: merged,
              last: incoming.last,
              totalCount: existing ? existing.totalCount : incoming.totalCount,
            };
          },
          read(existing) {
            return (
              existing && {
                books: Object.values(existing.books),
                last: existing.last,
                totalCount: existing.totalCount,
              }
            );
          },
        },
        authors: {
          keyArgs: false,

          merge(existing, incoming, { readField }) {
            const merged = existing ? { ...existing.authors } : {};
            incoming.authors.forEach((author) => {
              merged[readField("id", author)] = author;
            });
            return {
              authors: merged,
              last: incoming.last,
              totalCount: existing ? existing.totalCount : incoming.totalCount,
            };
          },

          read(existing) {
            return (
              existing && {
                authors: Object.values(existing.authors),
                last: existing.last,
                totalCount: existing.totalCount,
              }
            );
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
