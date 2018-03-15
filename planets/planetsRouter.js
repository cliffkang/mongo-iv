const express = require('express');

const Planet = require('./Planet.js');
const Character = require('../characters/Character.js');
const Specie = require('../species/Specie.js');

const router = express.Router();

// add endpoints here

router.get('/:id', (req, res) => {
   const { id } = req.params;
   Character.find({ homeworld: id })
   .then(char => {
      Specie.find({ homeworld: id })
      .then(species => {
         const result = {};
         result.characters = char;
         result.species = species;
         res.status(200);
         res.send(result);
      })
      .catch(err => {
         res.status(500);
         res.send({ error: 'error finding species' });
      })
   })
   .catch(err => {
      res.status(500);
      res.send({ error: 'error finding character' });
   })
});

module.exports = router;
