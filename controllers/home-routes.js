const router = require('express').Router();
const sequelize = require('../config/connection');
const { Workout, User, Comment, Exercise, Routine, Vote } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//     console.log(req.session);

//     Workout.findAll({
//         attributes: [
//             'id',
//             'workout_title',
//             'workout_description',
//             'workout_length',
//             'created_at',
//             [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE workout.id = vote.workout_id)'), 'vote_count']
//         ],
//         include: [
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'workout_id', 'user_id', 'created_at'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: User,
//                 attributes: ['username']
//             }
//         ]
//     })
//         .then(dbWorkoutData => {
//             // pass a single workout object into the homepage template
//             const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
//             res.render('homepage', {
//                 workouts
//                 //loggedIn: req.session.loggedIn
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

router.get('/community', (req, res) => {
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
            // pass a single workout object into the homepage template
            const workouts = dbWorkoutData.map(workout => workout.get({ plain: true }));
            res.render('community-workouts', {
                workouts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// router.get('/login', (req, res) => {
//     res.render('login');
// });

router.get('/create', (req, res) => {
    Routine.findAll({
        attributes: [
            'id',
            'name'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Exercise,
                attributes: ['name', 'gif', 'equipment']
            }
        ]
    })
        .then(dbRoutineData => {
            const routines = dbRoutineData.map(routine => routine.get({ plain: true }));
            res.render('create-workout', {
                routines,
                loggedIn: req.session.loggedIn
            })
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
                workout,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/routine/:id', (req,res) => {
    Routine.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name'
            ],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model:Exercise,
                attributes: ['name', 'gif', 'equipment']
            }
        ]
    })
        .then(dbRoutineData => {
            const routine = dbRoutineData.get({ plain: true });
            console.log(routine);
            res.render('routine', {
                routine,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;