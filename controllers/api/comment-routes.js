const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//Route to get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'workout_id'
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to get one comment by id
router.get('/:id', (req,res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'workout_id'
        ],
        include: {
            model: User,
            attributes: ['username']
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.json({ message: 'No comment found with this id' })
        }

        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Route to create a new comment
router.post('/', withAuth, (req,res) => {
    //add in session user_id check before create
    Comment.create({
        comment_text: req.body.comment_text,
        //change to session user_id
        user_id: req.body.user_id,
        workout_id: req.body.workout_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

//Route to delete a comment
router.delete('/:id', withAuth, (req,res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData) {
            res.json({ message: 'No comment found with this id' })
        }

        res.json(dbCommentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;