import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Main = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("name") === null) {
      console.log("isLogin? : ", isLogin);
    } else {
      setIsLogin(true);
      console.log("isLogin? : ", isLogin);
    }
  },[isLogin]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLogin((prev) => !prev);
  };
  return (
    <div>
      {isLogin ? (
        <>
          {sessionStorage.getItem("name")}님 안녕하세요.
          <br />
          <button onClick={handleLogout}>로그아웃</button>
          <br />
          <Link to={"/"}>메인 화면</Link>
        </>
      ) : (
        <>
          <Link to={"/login"}>로그인</Link>
          <br />
          <Link to={"/register"}>회원가입</Link>
        </>
      )}
    </div>
  );
};

export default Main;
