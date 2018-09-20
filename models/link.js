module.exports = function (sequelize, DataTypes) {
    var Link = sequelize.define("Link", {
        rating: {
            type: DataTypes.INTEGER
        }
    });

    Link.associate = function (models) {

        Link.belongsTo(models.Idiom, {
            foreignKey: {
                allowNull: false
            },
            as: idoim_1
        });
        Link.belongsTo(models.Idiom, {
            foreignKey: {
                allowNull: false
            },
            as: idoim_2
        });
    };

    return Link;
};
