// import all models
const Workout = require('./Workout');
const User = require('./User');
const Like = require('./Like');
const Comment = require('./Comment');

// create associations
User.hasMany(Workout, {
  foreignKey: 'user_id'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Workout, {
  through: Like,
  as: 'liked_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Workout.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'workout_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Like.belongsTo(Workout, {
  foreignKey: 'workout_id',
  onDelete: 'SET NULL'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Workout.hasMany(Vote, {
  foreignKey: 'workout_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Workout, {
  foreignKey: 'workout_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Workout.hasMany(Comment, {
  foreignKey: 'workout_id'
});

module.exports = { User, Post, Vote, Comment };