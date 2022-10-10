const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'movie',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            image: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('date');
                    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`;
                },
            },
            calification: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        },
        { logging: false, timestamps: false }
    );
};
