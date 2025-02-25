import "dotenv/config";
import { readFileSync } from "node:fs";
import path, { dirname } from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";

import { initAuthor, Author } from "./models/author.js";
import { initBook, Book } from "./models/book.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rdsCa = readFileSync(
  path.resolve(__dirname, "..", "config", "certs", "global-bundle.pem")
);

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: true,
            ca: [rdsCa],
          }
        : null,
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
