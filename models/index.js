// import all models
const User = require('./User');
const Workout = require('./Workout');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations 

//User to workouts
User.hasMany(Workout, {
    foreignKey: 'user_id'
});

Workout.belongsTo(User, {
    foreignKey: 'user_id'
    // onDelete: 'SET NULL'
});

//User to votes/likes
User.belongsToMany(Workout, {
    through: Vote,
    as: 'voted_workouts',
    foreignKey: 'user_id'
    // onDelete: 'SET NULL'
});

//Workout to votes/likes
Workout.belongsToMany(User, {
    through: Vote,
    as: 'voted_workouts',
    foreignKey: 'workout_id'
    // onDelete: 'SET NULL'
});

//Votes to users and workouts
Vote.belongsTo(User, {
    foreignKey: 'user_id'
    // onDelete: 'SET NULL'
});

Vote.belongsTo(Workout, {
    foreignKey: 'workout_id'
    // onDelete: 'SET NULL'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Workout.hasMany(Vote, {
    foreignKey: 'workout_id'
});

//Comment to user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
    // onDelete: 'SET NULL'
});

//Comment to workout
Comment.belongsTo(Workout, {
    foreignKey: 'workout_id'
    // onDelete: 'SET NULL'
});

//User to comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
    // onDelete: 'SET NULL'
});

//Workout to comments
Workout.hasMany(Comment, {
    foreignKey: 'workout_id'
});

module.exports = { User, Workout, Vote, Comment };