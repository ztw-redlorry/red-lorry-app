const Transport = require("./transport");
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('zamowienie', {
            zamId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            zamIloscTowaru: DataTypes.INTEGER,
            zamTermin: DataTypes.DATE ,
            magIdStart: DataTypes.INTEGER ,
            magIdKoniec: DataTypes.INTEGER,
            traId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Transport,
                    key: 'traId',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                }
            }
        },
        {
            freezeTableName: true,
            tableName: 'zamowienie',
            timestamps: false
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.order);
    };

    return Order;
};