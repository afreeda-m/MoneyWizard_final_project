const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const transactionsRouter = require('./routes/transactions.js');
const categoriesRouter = require('./routes/categories.js');
const accountsRouter = require('./routes/accounts.js');
const userRouter = require('./routes/user_auth.js');
const transfersRouter = require('./routes/transfers.js');
const iconsRouter = require('./routes/icons.js');
const cookieSession = require('cookie-session');


app.use(cors());

app.use(express.static('public'));

// middleware set up to parse the JSON body
app.use(express.json());

app.use(cookieSession({
  name: "session",
  keys: ['lighthouselabsPasswordKey'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use('/user', userRouter);
app.use('/transactions', transactionsRouter);
app.use('/transfer', transfersRouter);
app.use('/', categoriesRouter);
app.use('/', accountsRouter);
app.use('/', iconsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});