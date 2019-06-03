
module.exports = (sequelize, DataTypes) => {
    const Transport = sequelize.define('transport', {
            traId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            traTermin: DataTypes.DATE ,
            traAkceptacja: DataTypes.BOOLEAN ,
            pojId: DataTypes.INTEGER
        },
        {
            freezeTableName: true,
            tableName: 'transport',
            timestamps: false
        }
    );

    // Order.associate = (models) => {
    //     Order.belongsTo(models.order);
    // };

    return Transport;
};