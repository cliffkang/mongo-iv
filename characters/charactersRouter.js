const express = require('express');

const Character = require('./Character.js');
const Film = require('../films/Film.js');
const Vehicle = require('../vehicles/Vehicle.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
   const { id } = req.params;
   Character.find({ _id: id })
      .populate('homeworld')
      .then(char => {
         Film.find({ characters: id }).then(moviesIn => {
            const mov = moviesIn.map(movie => {
               return movie.title;
            })
            char[0].movies = mov;
            char[0].save().then(savedChar => {
               res.status(200).send(savedChar);
            })
            .catch(err => {
               res.status(500).send({ error: err });
            })
         });
      })
      .catch(err => {
         res.status(500);
         res.send({ error: 'error finding character' });
      });
});

router.get('/:id/vehicles', (req, res) => {
   const { id } = req.params;
   Vehicle.find({ pilots: id })
      .then(vehicles => {
         res.status(200);
         res.send(vehicles);
      })
      .catch(err => {
         res.status(500);
         res.send({ error: err });
      })
});

router.get('/', (req, res) => {
   const tallFemaleFilter = req.query.minheight;

   let query = Character.find()
      
   if (tallFemaleFilter) {
      query.where({ gender: 'female', height: { $gt: '100'} });
   }

   query
      .then(characters => {
         res.status(200);
         res.json(characters);
      })
      .catch(err => {
         res.status(500);
         res.send({ error: err });
      });
})

module.exports = router;
