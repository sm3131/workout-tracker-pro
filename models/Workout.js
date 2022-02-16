const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

<<<<<<< HEAD
// create our Workout model
class Workout extends Model {
  static like(body, models) {
    return models.Like.create({
=======
//Create our Workout model
class Workout extends Model {
  static upvote(body, models) {
    return models.Vote.create({
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
      user_id: body.user_id,
      workout_id: body.workout_id,
    }).then(() => {
      return Workout.findOne({
        where: {
<<<<<<< HEAD
          id: body.Workout_id,
        },
        attributes: [
          "id",
          "workout_description",
          "workout_title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM Like WHERE workout.id = like.workout_id)"
            ),
            "like_count",
          ],
        ],
        include: [
          {
            model: models.Comment,
            attributes: [
              "id",
              "comment_text",
              "workout_id",
              "user_id",
              "created_at",
            ],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
=======
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
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
      });
    });
  }
}

<<<<<<< HEAD
// create fields/columns for Workout model
=======
//Create fields/columns for Workout model
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
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
<<<<<<< HEAD
    workout_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workout_length: {
      type: DataTypes.TIME,
=======
    workout_length: {
      type: DataTypes.INTEGER,
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
<<<<<<< HEAD
    modelName: "Workout",
=======
    modelName: "workout",
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
  }
);

module.exports = Workout;