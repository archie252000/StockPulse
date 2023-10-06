module.exports = (sequelize, DataTypes) => {
    const UserSubscribedStocks = sequelize.define(
        'UserSubscribedStocks', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            symbol: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            targetPrice: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            }
        }, {
            timestamps: false
        }
    );

    UserSubscribedStocks.associate = (models) => {
        UserSubscribedStocks.belongsTo(models.User);
    }

    return UserSubscribedStocks;
}