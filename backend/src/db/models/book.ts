import { DataTypes, Model, Sequelize } from "sequelize";

export class Book extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public publishedDate!: Date;
}

export function initBook(sequelize: Sequelize) {
  Book.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING(512), allowNull: false },
      description: { type: DataTypes.TEXT },
      publishedDate: { type: DataTypes.DATEONLY, allowNull: false },
    },
    { tableName: "books", sequelize, underscored: true, timestamps: false }
  );
}
