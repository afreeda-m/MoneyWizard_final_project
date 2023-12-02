const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/accounts_query.js')

// GET accounts and total balance for a user
router.get('/accounts', async (req, res) => {
  // const userId = req.session.user_id;
  const userId = 1


  try {
    //  execute queries concurrently
    const [accounts, totalBalance] = await Promise.all([
      // Fetch the accounts for the user using getAccountsByUserId
      dbQueries.getAccountsByUserId(userId),

      // Calculate the total balance for the user using getTotalBalanceByUserId
      dbQueries.getTotalBalanceByUserId(userId),
    ]);

    // Send the response as JSON, containing the accounts and total balance
    res.json({ accounts, totalBalance });
  } catch (error) {

    console.error('Error fetching Accounts and Total Balance:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET route for getting accounts by ID
router.get('/accounts/:id', (req, res) => {
  const accountsId = req.params.id;

  dbQueries.getAccountsById(accountsId)
    .then((account) => {
      if (!account) {
        res.status(404).json({ error: 'Account not found' });
      } else {
        res.json(account);
      }
    })
    .catch((error) => {
      console.error('Error in Account by ID route:', error);
      res.status(500).send('Internal Server Error');
    });
});

// POST add a new account
router.post('/accounts/add', (req, res) => {
  // const userId = req.session.user_id;
  const userId = 1;
  const { account_name, balance, note } = req.body;

  // Validate input
  if (!account_name || !balance) {
    return res.status(400).json({ error: 'Account name and balance fields are required' });
  }

  const accountData = { account_name, balance, note };

  // Call the database function to add a new account
  dbQueries.addAccount(accountData, userId)
    .then(newAccount => res.status(201).json(newAccount))
    .catch(error => {
      console.error('Error adding an account:', error);
      res.status(500).send('Internal Server Error');
    });
});

// POST edit an account by ID

router.post('/accounts/:account_id/edit', (req, res) => {
  const accountId = req.params.account_id;
  const { account_name, balance, note } = req.body;

  const accountData = { account_name, balance, note };
  const userId = 1;
  // const userId = req.session.user_id;

  // Call the database function to edit the account
  dbQueries.updateAccount(accountId, accountData, userId)
  .then(editedAccount => {
    res.json(editedAccount);
  })
  .catch(error => {
    if (error.message === 'Account not found') {
      res.status(404).json({ error: 'Account not found' });
    } else {
      console.error('Error editing account:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});


// POST delete an account by ID
router.post('/accounts/:account_id/delete', (req, res) => {
  const accountId = req.params.account_id;
  const userId = 1;
  // const userId = req.session.user_id;

  // Call the database function to delete the account
  dbQueries.removeAccount(accountId, userId)
    .then(() => res.json({ message: 'Account deleted successfully' }))
    .catch(error => {
      console.error('Error deleting account:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;