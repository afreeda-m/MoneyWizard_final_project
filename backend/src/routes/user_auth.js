const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/user_query.js');

// New route for user login
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Use the checkUserCredentials function
  userQueries.checkUserCredentials(email)
    .then((user) => {
      if (user.password === password) {
        // User exists and password is valid, you can redirect to the dashboard or send a success response
        res.redirect('/dashboard');
      } else {
        // User doesn't exist or password is invalid, show an error message
        res.status(401).send('Invalid email or password. Please register.');
      }
    })
    .catch((error) => {
      console.error('Error checking user credentials:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

