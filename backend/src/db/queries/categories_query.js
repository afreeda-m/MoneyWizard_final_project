const db = require('../connection.js');

//get all categories where user_id is null AND where user_id is provided
const getCategoriesByUserId = (userId) => {
  const queryString = `
    SELECT *
    FROM categories
    WHERE (user_id IS NULL OR user_id = $1);
  `;

  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log("Unable to get categories by user_id", error);
    });
}

//Add new category
const addCategory = (categoryData, userId) => {
  const queryString = `
    INSERT INTO categories (category_name, type, logo_url, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`; // Use RETURNING * to get the inserted row

  return db
    .query(queryString, [categoryData.category_name, categoryData.type, categoryData.logo_url, userId])
    .then((data) => {
      return data.rows[0]; // only one row to be inserted
    })
    .catch((error) => {
      console.error("Unable to add new category", error);
      throw error;
    });
};

// Update Existing category
const updateCategory = (categoryId, categoryData, userId) => {
  // Check if the category exists before updating
  return getCategoryById(categoryId)
    .then(existingCategory => {
      if (!existingCategory) {
        throw new Error('Category not found');
      }

      // If the category exists, proceed with the update
      const queryString = `
        UPDATE categories
        SET category_name = $1, type = $2, logo_url = $3
        WHERE id = $4 AND user_id = $5
        RETURNING *;`;

      return db.query(queryString, [
        categoryData.category_name,
        categoryData.type,
        categoryData.logo_url,
        categoryId,
        userId
      ]);
    })
    .then(data => {
      return data.rows[0]; //only one updated row
    })
    .catch(error => {
      console.error("Unable to update category data", error);
      throw error;
    });
};



const removeCategory =(category_id, userId) =>{
  const queryString = `DELETE FROM categories WHERE id = $1 AND user_id = $2;`;
  return db
    .query(queryString, [category_id, userId])
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      console.log('Unable to remove category', error);
    });
};

// Get categories by type
const getCategoryByType = (type) => {
  const queryString =  `SELECT * FROM categories WHERE type = $1;`;

  return db
    .query(queryString, [type])
    .then((categories) => {
      return categories.rows;
    })
    .catch((error) => {
      console.log('Unable to get categories by type, ', error);
    });
}

module.exports = {

  getCategoriesByUserId,
  addCategory,
  updateCategory,
  removeCategory,
  getCategoryByType
};