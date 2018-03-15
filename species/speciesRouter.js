const express = require('express');

const Specie = require('./Specie.js');
const Character = require('../characters/Character.js');

const router = express.Router();

// add endpoints here

// const populatePosts = () => {
//   const posts = readPosts();
//   const stacks = posts.map(post => {
//     return new Posts(post).save();
//   });
//   return Promise.all(stacks)
//     .then(console.log('promise all completed'))
//     .catch(err => console.error('error in the Promise All'));
// };

router.put('/populate/characters', (req, res) => {
   const { id } = req.params;
   Specie.find({})
      .then(species => {
         species.forEach(spec => {
            const chars = spec.characters;
            Character.find({ key: spec.character_keys })
               .then(result => {
                  result.forEach(char => {
                     return chars.push(char._id);
                  });
                  console.log('chars is', chars);

                  const stacks = chars
                     .save()
                     .then(savedSpecies => console.log(savedSpecies))
                     .catch(err => {
                        res
                           .status(500)
                           .send({ error: 'could not save updated Species' });
                     });
                  Promise.all(stacks)
                     .then(console.log('promise all completed'))
                     .catch(err => console.error('error in the Promise All'));
               })
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
