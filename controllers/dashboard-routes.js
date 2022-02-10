const router = require('express').Router();
const sequelize = require('../config/connection');
const { Workout, User, Comment, Vote } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Workout.findAll({
        where: {
            user_id: 1
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
            res.render('dashboard', { workouts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;