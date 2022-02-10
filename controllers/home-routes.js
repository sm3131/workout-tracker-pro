const router = require('express').Router();
const sequelize = require('../config/connection');
const { Workout, User, Comment, Vote } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Workout.findAll({
        attributes: [
            'id',
            'workout_title',
            'workout_description',
            'workout_length',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE workout.id = vote.workout_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'workout_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbWorkoutData => {
            // pass a single workout object into the homepage template
            const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
            res.render('homepage', {
                workouts
                //loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/workout/:id', (req, res) => {
    Workout.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'workout_title',
            'workout_description',
            'workout_length',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE workout.id = vote.workout_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'workout_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbWorkoutData => {
            if (!dbWorkoutData) {
                res.status(404).json({ message: 'No workout found with this id' });
                return;
            }

            // serialize the data
            const workout = dbWorkoutData.get({ plain: true });

            // pass data to template
            res.render('single-workout', {
                workout
                //loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;