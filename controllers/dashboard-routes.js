const router = require('express').Router();
const sequelize = require('../config/connection');
const { Workout, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Workout.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'workout_title',
            'workout_description',
            'workout_length',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE workout.id = vote.workout_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
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
            // serialize data before passing to template
            const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
            res.render('dashboard', { workouts, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
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
            res.render('edit-workout', {
                workout,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;