import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import classes from "../SideMenu.module.css";

export const MyPageSideMenu = () => {
  return (
    <aside className={classes.root}>
      <ul className={classes.menu}>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/basket"
        >
          <li>장바구니</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/wish"
        >
          <li>관심상품</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/buy"
        >
          <li>구매내역</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/sell"
        >
          <li>판매내역</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/apply"
        >
          <li>판매요청내역</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => clsx(isActive && classes.active)}
          to="/mypage/question"
        >
          <li>문의사항</li>
        </NavLink>
        {/* <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/myPage7">
          <li>회원정보수정</li>
        </NavLink> */}
      </ul>
    </aside>
  );
};
