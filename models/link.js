module.exports = function (sequelize, DataTypes) {
    var Link = sequelize.define("Link", {
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    Link.associate = function (models) {

        Link.belongsTo(models.Idiom, {
            foreignKey: {
                allowNull: false
            },
            as: "idiom_1"
        });
        Link.belongsTo(models.Idiom, {
            foreignKey: {
                allowNull: false
            },
            as: "idiom_2"
        });
    };

    return Link;
};
