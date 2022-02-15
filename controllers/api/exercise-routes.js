const router = require('express').Router();
const { User, Exercise, Routine } = require('../../models');

//Route to get all exercise with comments and user
router.get('/', (req, res) => {
    Exercise.findAll({
        attributes: [
            'id',
            'name',
            'gif',
            'equipment',
            ],
        include: [
            {
                model: Routine,
                attributes: ['name', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbExerciseData => res.json(dbExerciseData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Exercise.create({
        name: req.body.name,
        gif: req.body.gif,
        equipment: req.body.equip,
        //user_id: req.session.user_id
        routine_id: req.body.routineId
    })
        .then(dbExerciseData => res.json(dbExerciseData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
