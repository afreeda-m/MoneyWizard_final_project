import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import CategoriesListItem from './CategoriesListItem';


function CategoriesList(props) {

  const incomeCategories = props.incomeCategories;
  const expenseCategories = props.expenseCategories;
  const deleteCategory = props.deleteCategory;


  return (

    <div className='d-flex flex-column align-items-center' style={{ width: "50vw" }}>

      {/* INCOME & EXPENSE TABLE TABS */}
      <Tabs defaultActiveKey="income" transition={true} className="mb-2" justify >

        {/* THE INCOME EXPENSES TAB */}
        <Tab eventKey="income" title="INCOME">

          {/* THE INCOME CATEGORIES TABLE */}
          <h3 className='d-flex flex-column align-items-center mt-3'>Income Categories</h3>

          <Table striped bordered hover>

            {/* TABLE HEAD */}
            <thead>
              <tr>
                <th>Category Logo</th>
                <th>Category Name</th>
                <th>Options</th>
              </tr>
            </thead>


            {/* TABLE BODY */}
            <tbody>

              {incomeCategories.map((incomeCategory) => (

                <CategoriesListItem
                  key={incomeCategory.id}

                  categoryId={incomeCategory.id}
                  categoryLogo={incomeCategory.logo_url}
                  categoryName={incomeCategory.category_name}
                  categoryType={"Income"}
                  deleteCategory={deleteCategory}
                />

              ))}

            </tbody>

          </Table>

        </Tab>


        {/* THE EXPENSES EXPENSES TAB */}
        <Tab eventKey="expenses" title="EXPENSES">

          {/* THE EXPENSES CATEGORIES TABLE */}
          <h3 className='d-flex flex-column align-items-center mt-3'>Expenses Categories</h3>

          <Table striped bordered hover>

            {/* TABLE HEAD */}
            <thead>
              <tr>
                <th>Category Logo</th>
                <th>Category Name</th>
                <th>Options</th>
              </tr>
            </thead>


            {/* TABLE BODY */}
            <tbody>

              {expenseCategories.map((expenseCategory) => (

                <CategoriesListItem
                  key={expenseCategory.id}

                  categoryId={expenseCategory.id}
                  categoryLogo={expenseCategory.logo_url}
                  categoryName={expenseCategory.category_name}
                  categoryType={"Expense"}
                  deleteCategory={deleteCategory}

                />

              ))}

            </tbody>

          </Table>

        </Tab>

      </Tabs>

    </div>

  );

}

export default CategoriesList;;