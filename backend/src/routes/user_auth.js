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
          req.session.save(function(err) {
            console.log("Error saving session", err);
          })

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
      res.status(200).json({"name": foundUser.name})
    });
});

router.post("/status", (req, res) => {

  if (!req.session || !req.session.user_id) {
    console.log("No session or userID found");
    res.status(200).json({"name": ''})
    return;
  }

  const userID = req.session.user_id

  userQueries.getUserById(userID)
    .then((foundUser) => {
      if (!foundUser) {
        console.log("No user found in DB");
        res.status(200).json({"name": ''})
        return;
      }
      console.log("User found", foundUser.name);
      res.status(200).json({"name": foundUser.name})
      return;
    });

});

//Logout user and clear cookies
router.post("/logout", (req, res) => {

  req.session = null;
  res.status(200).send();
});

module.exports = router;

