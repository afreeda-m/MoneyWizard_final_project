import React from 'react';
import CategoriesListItem from './CategoriesListItem';
import { ListGroup } from 'react-bootstrap';


function CategoriesList(props) {

  const { categories, getCategories } = props;

  const listOfCategories = categories.map((category) => {
    return (
      <CategoriesListItem
        key={category.id}
        categoryId={category.id}
        categoryName={category.category_name}
        categoryIcon={`/images/${category.logo_url}`}
        getCategories={getCategories}
        categoryUserId={category.user_id}
      />
    );
  });

  return (

    <ListGroup>
      {listOfCategories}
    </ListGroup>

  );

}

export default CategoriesList;;