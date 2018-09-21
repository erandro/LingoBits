module.exports = function (sequelize, DataTypes) {
  var Idiom = sequelize.define("Idiom", {
    origin_idiom: {
      type: DataTypes.STRING
    },
    pronunciation: {
      type: DataTypes.STRING
    },
    literal_meaning: {
      type: DataTypes.STRING
    },
    meaning: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.STRING
    }
  });

  Idiom.associate = function (models) {
    Idiom.belongsTo(models.Language, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Idiom;
};
