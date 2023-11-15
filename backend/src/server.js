const express = require('express');
const app = express();
const PORT = 8080;
const transactionsRouter = require('./routes/transactions.js')

app.use(express.static('public'));

app.use('/', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});