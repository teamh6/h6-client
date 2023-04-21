import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import logo from "../../../../resources/images/logo.png";
import search from "../../../../resources/images/search-20.png";
import classes from "./Header.module.css";
import { MemberContext, SetMemberContext } from "../../../../context";

export const Header = () => {
  const memberId = useContext(MemberContext);
  const setMemberId = useContext(SetMemberContext);
  const navigate = useNavigate();

  //? 여기서 memberId가 -1이었다가 null로 나와서 찍힌다.
  // console.log("memberId : ", memberId);
  const logOut = () => {
    sessionStorage.clear();
    // window.location.href = "/";

    setMemberId(-1);
    navigate("/");
  };
  useEffect(() => {
    if (
      //? 여기서 !==null 조건문을 걸어준다.
      sessionStorage.getItem("member_id") !== -1 &&
      sessionStorage.getItem("member_id") !== null
    ) {
      setMemberId(sessionStorage.getItem("member_id"));
      return;
    }
    setMemberId(-1);
  }, []);
  const onLoginCheck = (e) => {
    if (memberId === -1) {
      alert("로그인 후 이용가능합니다.");
      e.preventDefault();
    }
  };

  return (
    <header className={classes.root}>
      {/* {setId === null? 1 : 0} */}
      {memberId === -1 ? (
        <div className={classes.container}>
          <nav>
            <ul className={classes.navigation}>
              <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/cs/exam">
                <li>검수기준</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/cs/customer"
              >
                <li>고객센터</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/mypage/wish"
                onClick={onLoginCheck}
              >
                <li>관심상품</li>
              </NavLink>
              <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/login">
                <li>로그인/회원가입</li>
              </NavLink>
            </ul>
          </nav>
        </div>
      ) : Number(sessionStorage.getItem("admin")) === 1 ? (
        <div className={classes.container}>
          <nav>
            <ul className={classes.admin}>
              <li>관리자님 반갑습니다 </li>
              <li>
                <button style={{ color: "black" }} onClick={logOut}>
                  로그아웃
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className={classes.container}>
          <nav>
            <ul className={classes.navigation}>
              <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/cs/exam">
                <li>검수기준</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/cs/customer"
              >
                <li>고객센터</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/mypage/wish"
              >
                <li>관심상품</li>
              </NavLink>

              <li>
                <button onClick={logOut}>로그아웃</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {Number(sessionStorage.getItem("admin")) === 1 ? (
        <div className={classes.main}>
          {/* 로고 */}
          <Link className={classes.logo} to="/">
            <img src={logo} alt="HOW WATCH" state={{ category: "all" }} />
          </Link>

          <nav>
            <ul className={classes.navigation2}>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/"
                state={{ category: "all" }}
              >
                <li>홈</li>
              </NavLink>

              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/admin/saleList"
                onClick={onLoginCheck}
              >
                <li>관리페이지</li>
              </NavLink>

              {/* 검색창 */}
            </ul>
          </nav>
        </div>
      ) : (
        <div className={classes.main}>
          {/* 로고 */}
          <Link className={classes.logo} to="/">
            <img src={logo} alt="HOW WATCH" state={{ category: "all" }} />
          </Link>

          <nav>
            <ul className={classes.navigation2}>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/"
                state={{ category: "all" }}
              >
                <li>홈</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/product"
                onClick={onLoginCheck}
              >
                <li>판매요청</li>
              </NavLink>
              <NavLink
                className={({ isActive }) => clsx(isActive && classes.active)}
                to="/mypage/basket"
                onClick={onLoginCheck}
              >
                <li>마이페이지</li>
              </NavLink>

              {/* 검색창 */}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};
