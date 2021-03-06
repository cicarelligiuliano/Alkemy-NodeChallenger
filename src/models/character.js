const { DataTypes, Sequelize } = require('sequelize');

// image
// name
// age
// heigth
// history

module.exports = (sequelize) => {
    sequelize.define(
        'character',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            image: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            weight: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            history: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
        },
        { logging: false, timestamps: false }
    );
};
