import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import FloatingActionButton from "../components/FloatingActionButton";


const CategoriesManagement = () => {

  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);


  // When the page loads for the first time...
  useEffect(() => {

    const incomeCategoryUrl = "/category/type/Income";
    const expenseCategoryUrl = "/category/type/Expense";


    // ...Category names needs to be retrieved from the backend twice: first,
    // for Income-related categories and secondly, for Expense-related
    // categories. This is a generic function that makes call to the same
    // API route, using different parameters (`Income` or `Expense`). Note that
    // both parameter names are case sensitive. (Note: The database also
    // contains a third type: `Transfer`).
    const retrieveCategoryData = function(url) {

      axios.get(url)

        .then((response) => {
          // console.log(response.data);

          if (url === "/category/type/Income") {
            setIncomeCategories(response.data);
          } else {
            setExpenseCategories(response.data);
          }

        })
        .catch(function(error) {
          console.log(error);
        });

    };


    // Call this method twice to populate both Income & Expense data sets.
    retrieveCategoryData(incomeCategoryUrl);
    retrieveCategoryData(expenseCategoryUrl);

  }, []);


  // Test if the calls to the backend API went through properly.
  // console.log(incomeCategories);
  // console.log(expenseCategories);


  return (

    <div className="categoriesManagement d-flex flex-column align-items-center">

      <div class="d-flex flex-column align-items-center bg-body-tertiary mt-5">

        <h1>Categories Management</h1>

        <CategoriesList
          incomeCategories={incomeCategories}
          expenseCategories={expenseCategories}
        />

        <FloatingActionButton />

      </div>

    </div>

  );

};

export default CategoriesManagement;