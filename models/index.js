// import all models
const User = require('./User');
const Workout = require('./Workout');
const Vote = require('./Vote');
const Comment = require('./Comment');
const Exercise = require('./Exercise');
const Routine = require('./Routine');

// create associations 

//User to workouts
User.hasMany(Workout, {
    foreignKey: 'user_id'
});

Workout.belongsTo(User, {
    foreignKey: 'user_id'
});

//User to votes/likes
User.belongsToMany(Workout, {
    through: Vote,
    as: 'voted_workouts',
    foreignKey: 'user_id'
});

//Workout to votes/likes
Workout.belongsToMany(User, {
    through: Vote,
    as: 'voted_workouts',
    foreignKey: 'workout_id'
});

//Votes to users and workouts
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Workout, {
    foreignKey: 'workout_id'
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
});

//Comment to workout
Comment.belongsTo(Workout, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});

//User to comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

//Workout to comments
Workout.hasMany(Comment, {
    foreignKey: 'workout_id',
    onDelete: 'CASCADE'
});

User.hasMany(Routine, {
    foreignKey: 'user_id'
});

Routine.belongsTo(User, {
    foreignKey: 'user_id'
});

Routine.hasMany(Exercise, {
    foreignKey: 'routine_id',
    onDelete: 'CASCADE'
});

Exercise.belongsTo(Routine, {
    foreignKey: 'routine_id'
});

module.exports = { User, Workout, Vote, Comment, Routine, Exercise };