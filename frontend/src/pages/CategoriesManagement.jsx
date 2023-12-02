import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoriesList from "../components/CategoriesList";
import FloatingActionButton from "../components/FloatingActionButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const CategoriesManagement = (props) => {

  const { categoriesData, getCategories } = props;

  const incomeCategories = categoriesData.filter((category) => category.type === "Income");
  const expenseCategories = categoriesData.filter((category) => category.type === "Expense");



  // This function deletes a Category from a user's account.
  // const deleteCategory = function(categoryId, categoryType) {

  //   let categoryUrl;

  //   if (categoryType === "Income") {
  //     categoryUrl = incomeCategoryUrl;
  //   } else {
  //     categoryUrl = expenseCategoryUrl;
  //   }

  //   console.log(categoryId, categoryType);


  //   axios.post(`/categories/${categoryId}/delete`)
  //     .then((response) => {
  //       console.log(response.data.message);
  //     }).then(() => {
  //       if (categoryType === "Income") {
  //         setIncomeCategories(retrieveCategoryData(categoryUrl));
  //       }
  //       if (categoryType === "Expense") {
  //         setExpenseCategories(retrieveCategoryData(categoryUrl));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error Deleting Category: ", error);
  //     });

  // };


  return (

    <div className="categoriesManagement d-flex flex-column align-items-center">

      <div class="d-flex flex-column align-items-center bg-body-tertiary mt-5">

        {/* <h1>Categories Management</h1> */}
        <Tabs defaultActiveKey="income" transition={false} justify style={{ width: "30vw" }}>

          <Tab eventKey="income" title="INCOME">
            <CategoriesList
              categories={incomeCategories}
              getCategories={getCategories}
            />
          </Tab >

          <Tab eventKey="expense" title="EXPENSE">
            <CategoriesList
              categories={expenseCategories}
              getCategories={getCategories}
            />
          </Tab>

        </Tabs>


        <FloatingActionButton />

      </div>

    </div>

  );

};

export default CategoriesManagement;