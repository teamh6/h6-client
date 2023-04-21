import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideMenu } from "./SideMenu";
import classes from "./Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={classes.container}>
  
        <SideMenu />
        <main className={classes.page}>{children}</main>
        <div className={classes.none}></div>
      </div>

      <Footer />
    </>
  );
};
