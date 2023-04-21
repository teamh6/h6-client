import React from "react";
import {
  Link,
  Route,
  Routes,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
// css
import "./MyPage.css";

// 각 홈페이지 연결
import MyHome from "./MyHome"; //마이페이지 눌렀을때 나오는 화면
import Basket from "./Basket"; //장바구니
import Buy from "./Buy"; //구매목록
import Choose from "./Choose"; //찜목록
import Inquire from "./Inquire"; //문의사항
import Sale from "./Sale"; //판매목록
import SalesApplication from "./SalesApplication"; //판매신청목록
import EditMember from "./EditMember"; //회원정보수정

const MyPage_hellow = () => {
  return (
    <>
      <div className=" relative w-3/4 pb-[1000px]">
          <div className="float-left mt-[3%] ml-[5%]">
            <Link to={"/MyPage"}>
              <h2 className=" text-[25px] ml-[10px] font-bold">마이페이지</h2>
            </Link>
            <br />
            <ul className="  pl-2 text-[14px] text-gy-200">
              <li className="pb">
                <NavLink
                  to="/MyPage/장바구니"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  장바구니
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/찜목록"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  찜 목록
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/판매신청목록"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  판매 신청 목록
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/판매목록"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  판매 목록
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/구매목록"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  구매 목록
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/문의사항"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  문의 사항
                </NavLink>
              </li>
              <li className="pb">
                <NavLink
                  to="/MyPage/회원정보수정"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " activated" : "")
                  }
                >
                  회원 정보 수정
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="absoulte top-[50px] left-[60px] block mx-auto my-0">
            <Routes>
              <Route exact path="/MyPage" element={<MyHome />}></Route>
              <Route path="/MyPage/장바구니" element={<Basket />}></Route>
              <Route path="/MyPage/찜목록" element={<Choose />}></Route>
              <Route
                path="/MyPage/판매신청목록"
                element={<SalesApplication />}
              ></Route>
              <Route path="/MyPage/판매목록" element={<Sale />}></Route>
              <Route path="/MyPage/구매목록" element={<Buy />}></Route>
              <Route path="/MyPage/문의사항" element={<Inquire />}></Route>
              <Route
                path="/MyPage/회원정보수정"
                element={<EditMember />}
              ></Route>
            </Routes>
          </div>
      </div>
    </>
  );
};

export default MyPage_hellow;
