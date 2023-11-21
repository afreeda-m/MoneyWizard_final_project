import React from "react";
import "../styles/CategoriesManagement.scss";
import categories from "../mocks/categories";
import FloatingButton from "../components/FloatingButton";
import CategoryList from "../components/CategoryList";

const CategoriesManagement = () => {

  const expenseCategories = categories.filter((category) => category.type === "Expense");
  const incomeCategories = categories.filter((category) => category.type === "Income");

  return (
    <div className="catManagement">

      <h1>List of Categories</h1>

      <div className="category-display">

          <h2>Income</h2>

          <CategoryList
            categories={incomeCategories} />

          <h2>Expense</h2>

          <CategoryList
            categories={expenseCategories} />

      </div>
      <FloatingButton />

    </div>
  );
};

export default CategoriesManagement;