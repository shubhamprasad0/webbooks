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

type PaginatedBooks {
  books: [Book!]!
  totalCount: Int!
  last: ID
}

input AuthorInput {
  id: ID
  name: String
  biography: String
  bornDate: Date
}

type Query {
  books(title: String, author: String, publishedBefore: Date, publishedAfter: Date, cursor: ID, limit: Int): PaginatedBooks!
  authors(name: String, birthYear: Int, limit: Int, offset: Int): [Author!]!
  book(id: ID!): Book!
  author(id: ID!): Author!
}

type Mutation {
  createAuthor(name: String!, biography: String, bornDate: Date): Author!
  createBook(title: String!, description: String, publishedDate: Date!, author: AuthorInput!): Book!
}
`;

export default [DateTypeDefinition, typeDefs];
