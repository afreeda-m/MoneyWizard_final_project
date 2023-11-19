
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Accounts from './pages/Accounts';
import Report from './pages/Reports';
import Budgets from './pages/Budgets';
import RecurringTransactions from './pages/RecurringTrans';
import CategoriesManagement from './pages/CategoriesManagement';

function App() {
  return (
    <div className='App'>

      <BrowserRouter>

        <SideBar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}> </Route>
          <Route path='/transactions' element={<Transactions />}> </Route>
          <Route path='/accounts' element={<Accounts />}> </Route>
          <Route path='/reports' element={<Report />}> </Route>
          <Route path='/budgets' element={<Budgets />}> </Route>
          <Route path='/recurringtransactions' element={<RecurringTransactions />}> </Route>
          <Route path='/categoriesmanagement' element={<CategoriesManagement />}> </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
