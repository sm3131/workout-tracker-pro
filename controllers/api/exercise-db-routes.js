const router = require('express').Router()
const axios = require("axios").default;
require('dotenv').config();

router.get('/:bodyPart', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${req.params.bodyPart}`,
    headers: {
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': 'eb37a707d9msh643d5116098d0e8p1b2d44jsn7fefe2e0eb3b'
    }
  };

  axios.request(options)
    .then(function (response) {
      res.json(response.data);
    }).catch(function (error) {
      console.error(error);
    });
})

module.exports = router;
