const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Workout model
class Workout extends Model {
  static like(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      workout_id: body.workout_id,
    }).then(() => {
      return Workout.findOne({
        where: {
          id: body.Workout_id,
        },
        attributes: [
          "id",
          "workout_description",
          "workout_title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM like WHERE workout.id = like.workout_id)"
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
      });
    });
  }
}

// create fields/columns for Workout model
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
    workout_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workout_length: {
      type: DataTypes.TIME,
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
    modelName: "Workout",
  }
);

module.exports = Workout;