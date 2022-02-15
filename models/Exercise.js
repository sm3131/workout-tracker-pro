const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Creating Exercise model
class Exercise extends Model {}

//Creating columns/fields for Exercise model
Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    gif: {
      type: DataTypes.STRING,
      allowNull:false
    },
    equipment: {
      type: DataTypes.STRING,
      allowNull:false
    },
    routine_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'routine',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'exercise'
  }
);

module.exports = Exercise;