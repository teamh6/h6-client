import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import classes from "../SideMenu.module.css";

export const HomeSideMenu = () => {
  const url = "/watches/";
  return (
    <aside className={classes.root}>
      <ul className={classes.menu}>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to={"/"}
          state={{ category: "all" }}
        >
          <li>전체시계</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to={url + "quartz"}
          state={{ category: "quartz" }}
        >
          <li>아날로그(쿼츠)</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to={url + "automatic"}
          state={{ category: "automatic" }}
        >
          <li>아날로그(오토매틱)</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to={url + "digital"}
          state={{ category: "digital" }}
        >
          <li>디지털</li>
        </NavLink>

        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to={url + "etc"}
          state={{ category: "etc" }}
        >
          <li>기타</li>
        </NavLink>
      </ul>
    </aside>
  );
};
