const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Create our Workout model
class Workout extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      workout_id: body.workout_id,
    }).then(() => {
      return Workout.findOne({
        where: {
          id: body.workout_id,
        },
        attributes: [
          "id",
          "workout_title",
          "workout_description",
          "workout_length",
          "created_at",
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE workout.id = vote.workout_id)'), 'vote_count'
          ]
        ]
      });
    });
  }
}

//Create fields/columns for Workout model
Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    workout_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workout_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workout_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "workout",
  }
);

module.exports = Workout;