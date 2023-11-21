import React from "react";
import "../styles/CategoryListItem.scss"
import * as HiIcons from "react-icons/hi";

const CategoryListItem = (props) => {

  const { id, categoryIcon, categoryName } = props;

  return (
    <div key={id} className="category-list-item">

      <div className="category-icon">
        {categoryIcon}
      </div>

      <div className="category-name">
        {categoryName}
      </div>

      <HiIcons.HiDotsVertical />

    </div>
  );


};

export default CategoryListItem;