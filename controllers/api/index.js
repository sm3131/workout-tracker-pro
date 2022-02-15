const router = require('express').Router()

const userRoutes = require('./user-routes');
const workoutRoutes = require('./workout-routes');
const commentRoutes = require('./comment-routes');
const exerciseDbRoutes = require('./exercise-db-routes');
const exerciseRoutes = require('./exercise-routes');
const routineRoutes = require('./routine-routes');

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/comments', commentRoutes);
router.use('/exercisesDb', exerciseDbRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/routines', routineRoutes);

module.exports = router;
