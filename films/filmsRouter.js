const express = require('express');

const Film = require('./Film.js');

const router = express.Router();

// add endpoints here

router.get('/', (req, res) => {
   const producerFilter = req.query.producer;

   let query = Film.find()
      .sort('episode')
      .populate(
         'characters',
         'name gender height skin_color hair_color eye_color'
      )
      .populate('planets', 'name climate terrain gravity diameter')
      .select('title producer');

   if (producerFilter) {
      const filter = new RegExp(producerFilter, 'i');
      query.where({ producer: filter });
   }

   query
      .then(films => {
         res.status(200);
         res.json(films);
      })
      .catch(err => {
         res.status(500);
         res.send({ error: err });
      });
});

module.exports = router;
