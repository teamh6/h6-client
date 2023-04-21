import React from "react";
import classes from "../SideMenu.module.css";

export const NoneSideMenu = () => {
  return (
    <aside className={`${classes.root} ${classes.none}`}>
      <ul className={classes.menu}></ul>
    </aside>
  );
};
