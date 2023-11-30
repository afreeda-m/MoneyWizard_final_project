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


//register a new user
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

// clear cookies and logout user
router.post("/logout", (req, res) => {

  req.session = null;
  res.redirect("/login");
});


// // New route for user login
// router.post('/', (req, res) => {
//   const { email, password } = req.body;

//   // Use the checkUserCredentials function
//   userQueries.checkUserCredentials(email)
//     .then((user) => {
//       if (user.password === password) {
//         // User exists and password is valid, you can redirect to the dashboard or send a success response
//         res.redirect('/dashboard');
//       } else {
//         // User doesn't exist or password is invalid, show an error message
//         res.status(401).send('Invalid email or password. Please register.');
//       }
//     })
//     .catch((error) => {
//       console.error('Error checking user credentials:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });

module.exports = router;

