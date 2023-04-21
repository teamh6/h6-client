import React from "react";
import { useLocation } from "react-router-dom";
// import clsx from "clsx";
// import classes from "./SideMenu.module.css";
import { HomeSideMenu } from "./HomeSideMenu";
import { NoneSideMenu } from "./NoneSideMenu";
import { MyPageSideMenu } from "./MyPageSideMenu";
import { CustomerSideMenu } from "./CustomerMenu/CustomerMenu";
import { AdminSideMenu } from "./AdminSideMenu/AdminSideMenu";

export const SideMenu = () => {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/detail" || pathname.includes("/watches/")) {
    return <HomeSideMenu />;
  }
  if (pathname.includes("/mypage")) {
    return <MyPageSideMenu />;
  }
  if (pathname.includes("/cs/")) {
    return <CustomerSideMenu />;
  }
  if (pathname.includes("admin")) {
    return <AdminSideMenu />;
  }
  return <NoneSideMenu />;
};
