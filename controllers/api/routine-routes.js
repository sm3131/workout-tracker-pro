const router = require('express').Router();
const { User, Exercise, Routine } = require('../../models');

router.get('/', (req, res) => {
    Routine.findAll({
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
        .then(dbRoutineData => res.json(dbRoutineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Routine.create({
        name: req.body.routineName,
        user_id: req.body.user_id
    })
        .then(dbRoutineData => res.json(dbRoutineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Route to delete a routine
router.delete('/:id', (req, res) => {
    Routine.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbRoutineData => {
            if (!dbRoutineData) {
                res.status(404).json({ message: 'No routine found with this id' });
                return;
            }
            res.json(dbRoutineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;