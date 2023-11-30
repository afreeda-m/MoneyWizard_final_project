const express = require('express');
const router = express.Router();
const transfersQueries = require('../db/queries/transfers_query.js')

router.post('/add', (req, res) => {
  const transferData = {
    userId: 1,
    categoryId: req.body.post.categoryId,
    accountId: req.body.post.accountId,
    accountToId: req.body.post.accountToId,
    amount: req.body.post.amount,
    transaction_date: req.body.post.transaction_date,
    notes: req.body.post.notes
  }

  transfersQueries.addTransfer(transferData)
  .then(() => {
    res.redirect('/transactions')
  })
  .catch((error) => {
    console.log('Error in adding transfer to DB', error);
    res.status(500).send('Internal Server Error');
  })
})

router.post('/edit', (req, res) => {
  const transferData = {
    transactionId: req.body.post.transaction_id,
    userId: req.body.post.userId,
    categoryId: req.body.post.categoryId,
    accountId: req.body.post.accountId,
    accountToId: req.body.post.accountToId,
    amount: req.body.post.amount,
    transaction_date: req.body.post.transaction_date,
    notes: req.body.post.notes
  }

  transfersQueries.editTransfer(transferData)
  .then(() => {
    res.redirect('/transactions')
  })
  .catch((error) => {
    console.log('Error in editing transfer in DB', error);
    res.status(500).send('Internal Server Error');
  })
})

module.exports = router;