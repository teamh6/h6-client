import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import classes from "../SideMenu.module.css";

export const CustomerSideMenu = () => {
  return (
    <aside className={classes.root}>
      <ul className={classes.menu}>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/cs/customer"
        >
          <li>문의사항</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/cs/notice"
        >
          <li>공지사항</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/cs/faq"
        >
          <li>자주묻는질문</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/cs/exam"
        >
          <li>검수기준</li>
        </NavLink>
      </ul>
    </aside>
  );
};
