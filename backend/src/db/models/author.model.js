import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Author = sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      biography: {
        type: DataTypes.TEXT,
      },
      bornDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "authors",
      underscored: true,
      timestamps: false,
    }
  );

  Author.associate = (models) => {
    models.Author.hasMany(models.Book, {
      as: "author",
      foreignKey: "author_id",
    });
  };

  return Author;
};
