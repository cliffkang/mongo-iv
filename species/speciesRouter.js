const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character.js');

const router = express.Router();

// add endpoints here

router.put('/populate/characters', (req, res) => {
   const { id } = req.params;
   Specie.find({})
      .then(species => {
         species.forEach(spec => {
            const chars = [];
            Character.find({ key: spec.character_keys })
               .then(result => {
                  result.forEach(char => {
                     return chars.push(char._id);
                  });
                  spec.characters = chars;
                  spec
                     .save()
                     .then(savedSpecies => console.log('species\' character added', savedSpecies))
                     .catch(err => {
                        res
                           .status(500)
                           .send({ error: 'could not save updated Species' });
                     });
               })
               .then(res.status(200).send('completed'))
               .catch(err => {
                  error: 'error finding character ids';
               });
         });
      })
      .catch(err => {
         res.status(500);
         res.send({ error: 'error finding species' });
      });
});

module.exports = router;
