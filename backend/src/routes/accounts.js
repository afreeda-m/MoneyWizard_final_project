const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/accounts_query.js')

// GET accounts for a user
router.get('/accounts', (req, res) => {
  const userId = 1;

  dbQueries.getAccountsByUserId(userId)
    .then(accounts => res.json(accounts))
    .catch(error => {
      console.error('Error fetching Accounts:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;