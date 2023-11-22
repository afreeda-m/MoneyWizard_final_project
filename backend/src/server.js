const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const transactionsRouter = require('./routes/transactions.js')
const categoriesRouter = require('./routes/categories.js')
const accountsRouter = require('./routes/accounts.js')

const cors = require('cors');

app.use(cors());

app.use(express.static('public'));

// middleware set up to parse the JSON body
app.use(express.json());

app.use('/transactions', transactionsRouter);
app.use('/', categoriesRouter);
app.use('/', accountsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});