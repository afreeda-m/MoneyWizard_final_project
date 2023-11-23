import CategoryIcon from '@mui/icons-material/Category';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartIcon from '@mui/icons-material/PieChart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SavingsIcon from '@mui/icons-material/Savings';
import React from "react";


export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <PointOfSaleIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <SavingsIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <RequestQuoteIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Budgets',
    path: '/budgets',
    icon: <PieChartIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Recurring Transactions',
    path: '/recurringtransactions',
    icon: <CurrencyExchangeIcon />,
    cName: 'side-bar-item'
  },
  {
    title: 'Categories Management',
    path: '/categoriesmanagement',
    icon: <CategoryIcon />,
    cName: 'side-bar-item'
  },
];