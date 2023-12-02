// Import `bootstrap/dist/css/bootstrap.min.css` to import default Bootstrap
// styling into React-Bootstrap. Otherwise, your React-Bootstrap elements will
// not have any styling.
import 'bootstrap/dist/css/bootstrap.min.css';
// Import the `App.scss` file to enable SASS in your project.
import './App.scss';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAccountNameById, getCategoryIconById, getCategoryNameById, getCategoryTypeById } from "./helpers/helperFunctions";
import useApplicationData from './hooks/useApplicationData';
import Accounts from './pages/Accounts';
// import Budgets from './pages/Budgets';
// import RecurringTransactions from './pages/RecurringTransactions';
import CategoriesManagement from './pages/CategoriesManagement';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';


function App() {

  const {
    state,
    pickTransactionDate,
    incrementDate,
    decrementDate,
    toggleAddNewModal,
    toggleEditTransactionModal,
    toggleEditTransferModal,
    chooseTransaction,
    getTransactions,
    getAccounts,
    getCategories,
    setPostTransactionData,
    setIsLoggedIn,
    setUsername,
    toggleAddCategoryModal,
    setPostCategoryData
  } = useApplicationData();

  const {
    transactionsData,
    categoriesData,
    accountsData,
    date,
    transactionDate,
    isAddTransactionModalOpen,
    isEditTransactionModalOpen,
    isEditTransferModalOpen,
    chosenTransaction,
    postTransactionData,
    isLoggedIn,
    username,
    isAddCategoryModalOpen,
    postCategoryData
  } = state;

  return (
    <div className='App bg-body-tertiary'>

      {/* INTRODUCTION TO THE `REACT-ROUTER` LIBRARY
        *
        * React does not come with route handling, so instead it is standard
        * practice to use the `React-Router1 library to handle client-side
        * routing (as opposed to backend routing).
        *
        * From `React-Router` notes:
        *
        *   In traditional websites, the browser requests a document from a web
        *   server, downloads and evaluates CSS and JavaScript assets, and
        *   renders the HTML sent from the server. When the user clicks a link,
        *   it starts the process all over again for a new page.
        *
        *   Client side routing allows your app to update the URL from a link
        *   click without making another request for another document from the
        *   server. Instead, your app can immediately render some new UI and
        *   make data requests with fetch to update the page with new
        *   information.
        *
        *   This enables faster user experiences because the browser doesn't
        *   need to request an entirely new document or re-evaluate CSS and
        *   JavaScript assets for the next page. It also enables more dynamic
        *   user experiences with things like animation.
        *
        * Money Wizard does not use the current `react-router` convention. It
        * uses the old style of nested elements in this order: `BrowserRouter`
        * > `Routes` > `Route`. Be aware that v6.4 added a new, if not
        * necessarily better way, of doing this: by creating a
        * `createBrowserRouter` function.
        */}
      <BrowserRouter>

        {/* This is where all the routes in the application are defined. */}
        <Routes>

          {/* The Root Route for Money Wizard */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} username={username} />}> </Route>


          {/* REACT-ROUTER: THE OUTLET COMPONENT
            *
            * The 'Home.jsx' page should be accessible to all visitors. It does
            * NOT have a sidebar, but all the other main pages in the
            * application do (Dashboard, Transactions etc.). The obvious way
            * of handling this is the add the `SideBar.jsx` component to every
            * one of the these pages, but that would violate the DRY principle.
            *
            * To address cases like this, `react-router` has the `Outlet`
            * component. If you have a child component that must be added to
            * multiple parent components, the DRY way of doing this is to
            * declare a root (parent) element and put all child elements
            * within, as shown below.
            *
            * Then, within the parent element file (`Layout.jsx`), in the place
            * where you would have added the repeating component (`SideBar.jsx`),
            * you replace with the `Outlet` component. When the application
            * runs, `react-router` will automatically replace `Outlet` with the
            * selected child component. The `Outlet` component is basically a
            * placeholder for one of the child components. Based on which page
            * is user demands, Outlet will load that particular component.
            *
            * In Money Wizard, once the user logs in, they will be taken to
            * the user section of the website, starting with the `Dashboard`
            * page. All pages in the user section have this layout: a sidebar
            * on the left and the main page on the right.
            *
            * Therefore, a `Layout.jsx` component has been created to serve as
            * a common container page for the Sidebar and the all other pages
            * that will share the screen with it. This file will have only
            * two components: the `SideBar.jsx` and `Outlet` component.
            *
            * The `SideBar.jsx` component will be static, appearing on every
            * page, whereas the `Outlet` component represents the 7 other
            * main components.
            *
            * When website loads, it will load the `Layout` component and
            * display both elements, the sidebar and the main component. Which
            * component the latter one will be depends on which link was
            * clicked. If `/transactions` was clicked, then the sidebar and the
            * `Transactions` component will be loaded side-by-side.
            *
            * This gives us a clean DRY solution; otherwise, we would have had
            * to add duplicate `SideBar.jsx` components to all the child
            * components below. With this approach, we only need one additional
            * `Layout.jsx` component.
            */}
          <Route element={<Layout
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            username={username}
          />}>

            <Route path='/dashboard' element={<Dashboard
              transactionsData={transactionsData}
              categoriesData={categoriesData}
              accountsData={accountsData}
              chooseTransaction={chooseTransaction}
              getAccountNameById={getAccountNameById}
              getCategoryIconById={getCategoryIconById}
              getCategoryNameById={getCategoryNameById}
              getCategoryTypeById={getCategoryTypeById}
            />} />

            <Route path='/transactions' element={<Transactions
              transactionsData={transactionsData}
              categoriesData={categoriesData}
              accountsData={accountsData}
              date={date}
              incrementDate={incrementDate}
              decrementDate={decrementDate}
              transactionDate={transactionDate}
              pickTransactionDate={pickTransactionDate}
              isAddTransactionModalOpen={isAddTransactionModalOpen}
              toggleAddNewModal={toggleAddNewModal}
              isEditTransactionModalOpen={isEditTransactionModalOpen}
              toggleEditTransactionModal={toggleEditTransactionModal}
              isEditTransferModalOpen={isEditTransferModalOpen}
              toggleEditTransferModal={toggleEditTransferModal}
              chosenTransaction={chosenTransaction}
              chooseTransaction={chooseTransaction}
              getAccountNameById={getAccountNameById}
              getCategoryIconById={getCategoryIconById}
              getCategoryNameById={getCategoryNameById}
              getCategoryTypeById={getCategoryTypeById}
              getTransactions={getTransactions}
              setPostTransactionData={setPostTransactionData}
              postTransactionData={postTransactionData}
            />} />

            <Route path='/accounts' element={<Accounts />} />

            <Route path='/reports' element={<Reports
              date={date}
              incrementDate={incrementDate}
              decrementDate={decrementDate}
            />} />

            <Route path='/categoriesmanagement' element={<CategoriesManagement
              categoriesData={categoriesData}
              getCategories={getCategories}
              isAddCategoryModalOpen={isAddCategoryModalOpen}
              toggleAddCategoryModal={toggleAddCategoryModal}
              postCategoryData={postCategoryData}
              setPostCategoryData={setPostCategoryData}
            />} />

            {/* <Route path='/budgets' element={<Budgets />} />
            <Route path='/recurringtransactions' element={<RecurringTransactions />} /> */}

          </Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
