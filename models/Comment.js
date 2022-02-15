const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

<<<<<<< HEAD
class Comment extends Model {}

=======
//Creating Comment model
class Comment extends Model { }

//Creating columns/fields for Comment model
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
<<<<<<< HEAD
        len: [1]
=======
        len: [1, 280]
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
<<<<<<< HEAD
=======
      allowNull: false,
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
      references: {
        model: 'user',
        key: 'id'
      }
    },
<<<<<<< HEAD
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
=======
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'workout',
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;