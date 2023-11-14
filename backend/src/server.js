const express = require('express');

const app = express();

const PORT = 8080;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});