module.exports = (sequelize, DataTypes) => {
    const UserNotificationTokens = sequelize.define(
        'UserNotificationTokens', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            notificationToken: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            timestamps: false
        }
    );

    UserNotificationTokens.associate = (models) => {
        UserNotificationTokens.belongsTo(models.User);
    }

    return UserNotificationTokens;
};