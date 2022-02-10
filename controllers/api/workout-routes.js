const router = require('express').Router();
const { Workout, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');

//Route to get all workouts with comments and user
router.get('/', (req, res) => {
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
        .then(dbWorkoutData => res.json(dbWorkoutData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to get one workout by id with comments and user
router.get('/:id', (req, res) => {
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
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//Route to create a new workout
router.post('/', (req, res) => {
    Workout.create({
        workout_title: req.body.workout_title,
        workout_description: req.body.workout_description,
        workout_length: req.body.workout_length,
        //user_id: req.session.user_id
        user_id: req.body.user_id
    })
        .then(dbWorkoutData => res.json(dbWorkoutData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to like a workout
router.put('/upvote', (req, res) => {
    Workout.upvote(req.body, { Vote })
        .then(dbWorkoutData => res.json(dbWorkoutData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
})

//Route to update workout information
router.put('/:id', (req, res) => {
    Workout.update(
        {
            workout_title: req.body.workout_title,
            workout_description: req.body.workout_description,
            workout_length: req.body.workout_length
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbWorkoutData => {
            if (!dbWorkoutData) {
                res.status(404).json({ message: 'No workout found with this id' });
                return;
            }
            res.json(dbWorkoutData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to delete a workout
router.delete('/:id', (req, res) => {
    Workout.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbWorkoutData => {
            if (!dbWorkoutData) {
                res.status(404).json({ message: 'No workout found with this id' });
                return;
            }
            res.json(dbWorkoutData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
