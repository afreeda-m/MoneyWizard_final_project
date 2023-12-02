import CategoriesList from "../components/CategoriesList";
import CategoriesModalAddNew from "../components/CategoriesModalAddNew";
import FloatingActionButton from "../components/FloatingActionButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const CategoriesManagement = (props) => {

  const {
    categoriesData,
    getCategories,
    isAddCategoryModalOpen,
    toggleAddCategoryModal,
    postCategoryData,
    setPostCategoryData
  } = props;

  const incomeCategories = categoriesData.filter((category) => category.type === "Income");
  const expenseCategories = categoriesData.filter((category) => category.type === "Expense");

  return (

    <div className="d-flex flex-column align-items-center bg-body-tertiary mt-5">

      <h1 className='mb-5'>Categories Management</h1>

      {/* Render category list with React Bootstrap Tabs component */}
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

      {/* Floating button to toggle CategoryModalAddNew */}
      <div onClick={toggleAddCategoryModal}>
        <FloatingActionButton />
      </div>

      <CategoriesModalAddNew
        isAddCategoryModalOpen={isAddCategoryModalOpen}
        toggleAddCategoryModal={toggleAddCategoryModal}
        postCategoryData={postCategoryData}
        setPostCategoryData={setPostCategoryData}
      />

    </div>

  );

};

export default CategoriesManagement;