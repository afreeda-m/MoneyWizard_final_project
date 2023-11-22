import React from "react";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";


export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdIcons.MdDashboard />,
    cName: 'side-bar-item'
  },
  {
    title: 'Transactions',
    path: '/transactions',
    icon: <MdIcons.MdOutlineAttachMoney  />,
    cName: 'side-bar-item'
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <MdIcons.MdAccountBalanceWallet />,
    cName: 'side-bar-item'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoDocumentsSharp />,
    cName: 'side-bar-item'
  },
  {
    title: 'Budgets',
    path: '/budgets',
    icon: <IoIcons.IoPieChart />,
    cName: 'side-bar-item'
  },
  {
    title: 'Recurring Transactions',
    path: '/recurringtransactions',
    icon: <MdIcons.MdOutlineRepeat />,
    cName: 'side-bar-item'
  },
  {
    title: 'Categories Management',
    path: '/categoriesmanagement',
    icon: <MdIcons.MdCategory />,
    cName: 'side-bar-item'
  },
];