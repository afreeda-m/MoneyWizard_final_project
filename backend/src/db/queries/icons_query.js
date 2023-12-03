const db = require('../connection.js');

const getIcons = () => {
  const queryString = 'SELECT * FROM icons;';
  return db
    .query(queryString)
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('Error with getIcons db query:', error);
    });
};

module.exports = { getIcons };