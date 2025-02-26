import "dotenv/config";
import { Sequelize } from "sequelize";

import { initAuthor, Author } from "./models/author.js";
import { initBook, Book } from "./models/book.js";

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production",
  },
});

initAuthor(sequelize);
initBook(sequelize);

Author.hasMany(Book, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "CASCADE",
});
Book.belongsTo(Author, {
  foreignKey: "author_id",
  as: "author",
  onDelete: "CASCADE",
});

await sequelize.sync({ alter: true });

export { sequelize, Author, Book };
