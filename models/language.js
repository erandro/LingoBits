module.exports = function (sequelize, DataTypes) {
    var Language = sequelize.define("Language", {
        language_name: {
            type: DataTypes.STRING
        },
        abbreviation: {
            type: DataTypes.STRING,
            validate: {
                len: [2, 3]
            }
        },
        icon: {
            type: DataTypes.STRING
        }
    });

    Language.associate = function (models) {
        Language.hasMany(models.Idiom, {
            onDelete: "cascade"
        });
    };

    return Language;
};
