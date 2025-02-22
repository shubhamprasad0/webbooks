import { DateTypeDefinition } from "graphql-scalars";

const typeDefs = `#graphql

type Author {
  id: ID!
  name: String!
  biography: String
  bornDate: Date
}

type Book {
  id: ID!
  title: String!
  description: String
  publishedDate: Date!
  author: Author!
}

input AuthorInput {
  id: ID
  name: String
  biography: String
  bornDate: Date
}

type Query {
  books: [Book!]!
  authors: [Author!]!
}

type Mutation {
  createAuthor(name: String!, biography: String, bornDate: Date): Author!
  createBook(title: String!, description: String, publishedDate: Date!, author: AuthorInput!): Book!
}
`;

export default [DateTypeDefinition, typeDefs];
