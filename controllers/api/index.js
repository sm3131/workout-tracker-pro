const router = require('express').Router()

const userRoutes = require('./user-routes');
const workoutRoutes = require('./workout-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
