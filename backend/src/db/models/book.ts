import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface BookAttributes {
  id: number;
  title: string;
  description?: string;
  publishedDate: Date;
  authorId: number; // Explicitly define this field
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}
export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public publishedDate!: Date;
  public authorId!: number;
}

export function initBook(sequelize: Sequelize) {
  Book.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(512), allowNull: false },
      description: { type: DataTypes.TEXT },
      publishedDate: { type: DataTypes.DATEONLY, allowNull: false },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "authors", key: "id" },
      },
    },
    { tableName: "books", sequelize, underscored: true, timestamps: false }
  );
}
