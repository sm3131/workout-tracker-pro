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
                workouts,
                //loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

