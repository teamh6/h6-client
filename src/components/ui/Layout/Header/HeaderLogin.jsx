import React from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import logo from "../../../../resources/images/로고-투명.png";
import search from "../../../../resources/images/search-20.png";
import classes from "./Header.module.css";

export const HeaderLogin = (props) => {
  // const[getId,setGetId] = useState('');
  // let setId = sessionStorage.getItem('admin');
  //^ 테스트 해봐야 할 것

  return (
    <header className={classes.root}>
      {/* {setId === null? 1 : 0} */}
      <div className={classes.container}>
        <nav>
          <ul className={classes.navigation}>
            {/* clsx : className을 조합하는 데 사용하는 라이브러리 
            isActive : NavLink에서 제공하는 값 활성화 되어있으면 classes.active라는 이름이 붙음
            => 활성화 되어 있으면 .navigation .active라는 이름이 붙음
            NavLink와 Link의 차이는 스타일을 입힐 수 있냐 없냐 차이
             */}
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/cs">
              <li>고객센터</li>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/like">
              <li>관심상품</li>
            </NavLink>
            <li>
              <button>로그아웃</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.main}>
        {/* 로고 */}
        <Link className={classes.logo} to="/">
          <img src={logo} alt="HOW WATCH" />
        </Link>
        <nav>
          <ul className={classes.navigation2}>
            {/* clsx : className을 조합하는 데 사용하는 라이브러리 
            isActive : NavLink에서 제공하는 값 활성화 되어있으면 classes.active라는 이름이 붙음
            => 활성화 되어 있으면 .navigation .active라는 이름이 붙음
            NavLink와 Link의 차이는 스타일을 입힐 수 있냐 없냐 차이
             */}
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/">
              <li>홈</li>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/sale">
              <li>내 판매목록</li>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/my-page">
              <li>마이페이지</li>
            </NavLink>
            <NavLink className={({ isActive }) => clsx(isActive && classes.active)} to="/search">
              <img src={search} alt="" />
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
};
