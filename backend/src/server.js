const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const transactionsRouter = require('./routes/transactions.js')

app.use(express.static('public'));
app.use(express.json());

app.use(cors());

app.use('/transactions', transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});