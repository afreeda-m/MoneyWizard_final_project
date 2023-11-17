const express = require('express');
const router = express.Router();
const dbQueries = require('../db/queries/categories_query.js')

// GET categories for a user
router.get('/categories', (req, res) => {
  const userId = 1;

  dbQueries.getCategoriesByUserId(userId)
    .then(categories => res.json(categories))
    .catch(error => {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal Server Error');
    });
});

// GET route for getting a category by ID
router.get('/categories/:id', (req, res) => {
  const categoryId = req.params.id;

  dbQueries.getCategoryById(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.json(category);
      }
    })
    .catch((error) => {
      console.error('Error in category by ID route:', error);
      res.status(500).send('Internal Server Error');
    });
});

// POST add a new category
router.post('/categories/add', (req, res) => {
  const userId = 1;
  const { category_name, type, logo_url } = req.body;

  // Validate input
  if (!category_name || !type) {
    return res.status(400).json({ error: 'Category name and type fields are required' });
  }

  const categoryData = { category_name, type, logo_url };

  // Call the database function to add a new category
  dbQueries.addCategory(categoryData, userId)
    .then(newCategory => res.status(201).json(newCategory))
    .catch(error => {
      console.error('Error adding category:', error);
      res.status(500).send('Internal Server Error');
    });
});

// POST edit a category by ID

router.post('/categories/:category_id/edit', (req, res) => {
  const categoryId = req.params.category_id;
  const { category_name, type, logo_url } = req.body;

  const categoryData = { category_name, type, logo_url };
  const userId = 1;
  
  // Call the database function to edit the category
  dbQueries.updateCategory(categoryId, categoryData, userId)
  .then(editedCategory => {
    res.json(editedCategory);
  })
  .catch(error => {
    if (error.message === 'Category not found') {
      res.status(404).json({ error: 'Category not found' });
    } else {
      console.error('Error editing category:', error);
      res.status(500).send('Internal Server Error');
    }
  });
});

module.exports = router;