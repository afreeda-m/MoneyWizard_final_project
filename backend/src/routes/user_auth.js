const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/user_query.js');
const bcrypt = require('bcryptjs');

//register a new user
router.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  // validate credentials
  if (!email || !password) {
    res.status(400).send("Invalid credentials");
    return;
  }

  userQueries.checkUserCredentials(email)
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).send("Email already exists");
        return;
      }

      userQueries.addNewUser(email, name, bcrypt.hashSync(password, 10))
        .then((userID) => {
          // set the userID cookie
          req.session.user_id = userID;

          res.redirect("/dashboard");
        });
    });
});


//User login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // validate credentials
  if (!email || !password) {
    console.log("Invalid credentials", email, password)
    res.status(400).send("Invalid credentials");
    return;
  }

  userQueries.checkUserCredentials(email)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).send("Invalid credentials");
        return;
      }
      req.session.user_id = foundUser.id;
      console.log("Redirecting to dashboard");
      res.status(200).send()
    });
});

//Logout user and clear cookies
router.post("/logout", (req, res) => {

  req.session = null;
  res.redirect("/login");
});

module.exports = router;

