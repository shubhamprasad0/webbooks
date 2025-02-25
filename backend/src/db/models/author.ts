import {
  DataTypes,
  Model,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Author extends Model<
  InferAttributes<Author>,
  InferCreationAttributes<Author>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare biography: string;
  declare bornDate: Date;
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
