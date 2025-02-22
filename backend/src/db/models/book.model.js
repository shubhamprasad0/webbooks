import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(512),
      },
      description: {
        type: DataTypes.TEXT,
      },
      publishedDate: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "books",
      underscored: true,
      timestamps: false,
    }
  );

  Book.associate = (models) => {
    models.Book.belongsTo(models.Author, {
      as: "author",
      foreignKey: "author_id",
    });
  };

  return Book;
};
