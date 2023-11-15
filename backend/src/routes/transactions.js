const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/database.js')

router.get('/transactions', (req, res) => {
  const userId = 1;

  dbQueries.getTransactionsByUserId(userId)
    .then(transactions => res.json(transactions))
    .catch(error => {
      console.error('Error fetching transactions:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;