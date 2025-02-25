import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface AuthorAttributes {
  id: number;
  name: string;
  biography?: string;
  bornDate?: Date;
}

interface AuthorCreationAttributes extends Optional<AuthorAttributes, "id"> {}

export class Author
  extends Model<AuthorAttributes, AuthorCreationAttributes>
  implements AuthorAttributes
{
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
