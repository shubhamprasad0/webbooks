import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Book extends Model<
  InferAttributes<Book>,
  InferCreationAttributes<Book>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare publishedDate: Date;
  declare authorId: number;
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
