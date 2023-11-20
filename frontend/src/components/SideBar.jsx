import React from "react";
import { Link } from 'react-router-dom';
import { SideBarData } from "../data/SideBarData";
import '../styles/SideBar.scss';

const SideBar = () => {

  return (
    <>
      <nav className='side-bar'>
        <img id="logo" src="MWlogo.png" alt="Money Wizard logo"></img>
        <ul className='side-bar-items-list'>
          {SideBarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;