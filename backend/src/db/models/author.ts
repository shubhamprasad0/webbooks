import { DataTypes, Model, Sequelize } from "sequelize";

export class Author extends Model {
  public id!: number;
  public name!: string;
  public biography?: string;
  public bornDate?: Date;
}

export function initAuthor(sequelize: Sequelize) {
  Author.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      biography: { type: DataTypes.TEXT },
      bornDate: { type: DataTypes.DATEONLY },
    },
    { tableName: "authors", sequelize, underscored: true, timestamps: false }
  );
}
