const express = require('express');
const app = express();
const PORT = 8080;
const db = require('./db/connection.js');

app.use(express.static('public'));

//test to see if server can connect to DB
app.get('/', (req, res) => {
  db.query('SELECT * from users;')
  .then(result => res.json(result.rows))
  .catch(error => {
    console.log('Error fetching users', error)
    res.status(500).json({error: "Internal server error"})
  })
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});