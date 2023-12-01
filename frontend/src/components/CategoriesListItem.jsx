import React from 'react';

const CategoriesListItem = (props) => {

  const { categoryLogo, categoryName } = props;


  return (

    <tr>
      {/* {`/backend/src/public/images/${categoryLogo}`} */}
      <td><img alt="Category Logo"/>{categoryLogo}</td>
      <td>{categoryName}</td>
      <td>Add/Delete</td>
    </tr>


  );
};


export default CategoriesListItem;