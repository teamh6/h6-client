import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import classes from "../SideMenu.module.css";

export const AdminSideMenu = () => {
  return (
    <aside className={classes.root}>
      <ul className={classes.menu}>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/admin/salelist"
        >
          <li>판매내역</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/admin/saleapplist"
        >
          <li>판매요청내역</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/admin/question"
        >
          <li>문의사항내역</li>
        </NavLink>
      </ul>
    </aside>
  );
};
