import React from "react";
import clsx from "clsx";
import classes from "./Pagination.module.css";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);
  // console.log("page :", page);

  return (
    <>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => {
          const isActive = page === i + 1;
          return (
            <button
              className={clsx(classes.button, isActive && classes.active)}
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              &nbsp;
              {i + 1}&nbsp;
            </button>
          );
        })}
      <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </button>
    </>
  );
}

export default Pagination;
