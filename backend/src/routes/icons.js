const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/icons_query.js');

router.get('/icons', (req, res) => {
  dbQueries.getIcons()
    .then(icons => res.json(icons))
    .catch((error) => {
      console.error('Error fetching icons:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;