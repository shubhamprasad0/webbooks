import { DateResolver } from "graphql-scalars";
import { Author, Book } from "../db/index.js";

const resolvers = {
  Date: DateResolver,
  Query: {
    books: async () => await Book.findAll(),
    authors: async () => await Author.findAll(),
  },

  Mutation: {
    createAuthor: async (_, { name, biography, bornDate }) => {
      const author = await Author.create({
        name,
        biography,
        bornDate,
      });
      return author;
    },

    createBook: async (_, { title, description, publishedDate, author }) => {
      let existingAuthor: Author;

      // If author ID is provided, fetch it
      if (author.id) {
        existingAuthor = await Author.findByPk(author.id);
        if (!existingAuthor) {
          throw new Error("Author not found");
        }
      } else {
        // If author ID is not provided, find by name or create new
        existingAuthor = await Author.findOne({ where: { name: author.name } });

        if (!existingAuthor) {
          existingAuthor = await Author.create({
            name: author.name,
            biography: author.biography,
            bornDate: author.bornDate,
          });
        }
      }

      const book = await Book.create({
        title,
        description,
        publishedDate,
        author_id: existingAuthor.id,
      });

      // Fetch the book again with the associated author
      const bookWithAuthor = await Book.findByPk(book.id, {
        include: [{ model: Author, as: "author" }],
      });

      return bookWithAuthor;
    },
  },
};

export default resolvers;
