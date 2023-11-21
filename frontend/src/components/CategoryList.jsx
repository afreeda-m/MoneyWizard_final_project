import React from "react";
import "../styles/CategoryList.scss"
import CategoryListItem from "./CategoryListItem";

const CategoryList = (props) => {

  const { categories } = props;

  const listOfCategories = categories.map((category) => {
    return (
      <CategoryListItem
        key={category.id}
        id={category.id}
        categoryIcon={category.logo_url}
        categoryName={category.category_name}
      />
    );
  });

  return (
    <div className="category-list">
      {listOfCategories}
    </div>
  );
};

export default CategoryList;
