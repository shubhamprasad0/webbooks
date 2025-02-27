import { DateResolver } from "graphql-scalars";
import { Author, Book } from "../db/index.js";
import { Op } from "sequelize";

const resolvers = {
  Date: DateResolver,
  Query: {
    books: async (
      _,
      { title, author, publishedBefore, publishedAfter, cursor, limit = 10 }
    ) => {
      const authorWhere = {};
      const bookWhere = {};

      if (title) {
        bookWhere["title"] = title;
      }

      if (author) {
        authorWhere["name"] = author;
      }

      if (publishedBefore) {
        bookWhere["publishedDate"] = { [Op.lt]: publishedBefore };
      }

      if (publishedAfter) {
        bookWhere["publishedDate"] = { [Op.gt]: publishedAfter };
      }

      if (cursor) {
        bookWhere["id"] = { [Op.gt]: cursor };
      }

      const { rows: books, count } = await Book.findAndCountAll({
        include: [
          {
            model: Author,
            as: "author",
            where: authorWhere,
          },
        ],
        where: bookWhere,
        order: [["id", "ASC"]],
        limit,
      });

      return {
        books,
        totalCount: count,
        last: books.length ? books[books.length - 1].id : null,
      };
    },
    authors: async (_, { name, birthYear, cursor, limit = 10 }) => {
      const whereClause = {};

      if (name) {
        whereClause["name"] = name;
      }

      if (birthYear) {
        const start = `${birthYear}-01-01`;
        const end = `${birthYear}-12-31`;

        whereClause["bornDate"] = { [Op.gte]: start, [Op.lte]: end };
      }

      if (cursor) {
        whereClause["id"] = { [Op.gt]: cursor };
      }

      const { rows: authors, count } = await Author.findAndCountAll({
        where: whereClause,
        limit,
        order: [["id", "ASC"]],
      });

      return {
        authors,
        totalCount: count,
        last: authors.length ? authors[authors.length - 1].id : null,
      };
    },
    book: async (_, { id }) => {
      const book = await Book.findByPk(id, {
        include: { model: Author, as: "author" },
      });
      if (book === null) {
        throw new Error("Book not found");
      }
      return book;
    },
    author: async (_, { id }) => {
      const author = await Author.findByPk(id);
      if (author === null) {
        throw new Error("Author not found");
      }
      return author;
    },
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

    updateAuthor: async (_, { id, name, biography, bornDate }) => {
      const author = await Author.findByPk(id);

      if (!author) {
        throw new Error("Author not found");
      }

      await author.update({ name, biography, bornDate });
      return author;
    },

    deleteAuthor: async (_, { id }) => {
      const author = await Author.findByPk(id);

      if (!author) {
        throw new Error("Author not found");
      }

      try {
        await author.destroy();
      } catch (err) {
        console.error("Failed to delete author ", err);
        return false;
      }

      return true;
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
        authorId: existingAuthor.id,
      });

      // Fetch the book again with the associated author
      const bookWithAuthor = await Book.findByPk(book.id, {
        include: [{ model: Author, as: "author" }],
      });

      return bookWithAuthor;
    },

    updateBook: async (
      _,
      { id, title, description, publishedDate, authorId }
    ) => {
      const book = await Book.findByPk(id, {
        include: { model: Author, as: "author" },
      });
      if (!book) {
        throw new Error("Book not found");
      }

      if (authorId) {
        const author = await Author.findByPk(authorId);
        if (!author) {
          throw new Error("Author not found");
        }
      }

      await book.update({
        title,
        description,
        publishedDate,
        authorId,
      });

      if (authorId) {
        await book.reload(); // to refresh the author details inside book
      }

      return book;
    },

    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (!book) {
        throw new Error("Book not found");
      }

      try {
        await book.destroy();
      } catch (err) {
        console.error("Failed to delete book: ", err);
        return false;
      }

      return true;
    },
  },
};

export default resolvers;
