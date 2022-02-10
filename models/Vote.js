const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Creating Vote model
class Vote extends Model { }

//Creating columns/fields for Vote model
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        workout_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'workout',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;