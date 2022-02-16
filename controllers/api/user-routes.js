<<<<<<< HEAD
<<<<<<< HEAD
const routes = require('express').Router();
=======
const router = require('express').Router()
const { User, Workout, Comment, Vote } = require('../../models')
=======
const router = require('express').Router();
const { User, Workout, Comment, Vote } = require('../../models');
>>>>>>> 6f8b0fe898a680f39b178a19d7972ecdcff90415

//Route to get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to get user by id with workouts, likes, and comments
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Workout,
                attributes: ['id', 'workout_title', 'workout_description',
                'workout_length', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at']
            },
            {
                model: Workout,
                attributes: ['workout_title'],
                through: Vote,
                as: 'voted_workouts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id ' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        })
})

//Route to create a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.email = dbUserData.email;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.json(500).json(err);
        })
})

//Route to allow a user to login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email!' });
            return;
        }
        // Verify user
        dbUserData.checkPassword(req.body.password)
        .then(match => {
        if (!match) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        })
        })
    });
});

//Route to allow the user to logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        //res.status(404).end();
        res.redirect('/login');
    }
});

//Route to delete a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
>>>>>>> 5b92bab7bc3ee56d1ebda386d8cc8debdb96145b
