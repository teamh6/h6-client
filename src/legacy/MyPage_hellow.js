import React from "react";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./input.css";

const MyPage_hellow = () => {
  return (
    <>
      {/* wapper */}
      {/* min-h-[500px] pb-[10px] h-full */}
      <div className=" header_main_position ">
        {/* content */}
        <div className=" mt-[00px] pb-[800px]">
          <div className="absolute inset-y-0 left-[100px] top-[50px]">
            <Router>
              <Link to="/MyPage">
                <h2 className=" text-[25px]">마이페이지</h2>
              </Link>
              <br />
              <ul className=" pl-5 text-[14px]">
                <li>
                  <Link to="/장바구니">
                    <a href="">장바구니</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/찜목록">
                    <a href="">찜목록</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/판매신청목록">
                    <a href="">판매 신청 목록</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/판매목록">
                    <a href="">판매 목록</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/구매목록">
                    <a href="">구매 목록</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/문의사항">
                    <a href="">문의 사항</a>{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/회원 정보 수정">
                    <a href="">회원 정보 수정</a>{" "}
                  </Link>
                </li>
              </ul>
            </Router>
          </div>
          <div className="absolute top-[50px] left-[300px] text-[14px] ">
            <h3 className="pt-6 pb-8 ">ㅇㅇ님 반갑습니다!</h3>
            <div>
              <p className="text-[14px] ">판매 신청 목록</p>
              <div className="absolute py-[20px] w-[145px] bg-slate-300 border-2 ">
                <p className="text-center">신 청</p>
                <p className="text-center">0</p>
              </div>
              <div className="absolute left-[150px] py-[20px] w-[145px] bg-slate-300 border-2">
                <p className="text-center">검토 중</p>
                <p className="text-center">0</p>
              </div>
              <div className="absolute left-[300px] py-[20px] w-[145px] bg-slate-300 border-2">
                <p className="text-center">승인</p>
                <p className="text-center">0</p>
              </div>
              <div className="absolute left-[450px] py-[20px] w-[145px] bg-slate-300 border-2">
                <p className="text-center">거절</p>
                <p className="text-center">0</p>
              </div>
              <div className="absolute top-[220px] left-0 float-none">
                <p> 찜 목록</p>
                <div className="absolute py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[150px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[300px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[450px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
              </div>
              <div className="absolute top-[350px] left-0">
                <p>장바구니</p>
                <div className="absolute py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[150px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[300px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
                <div className="absolute left-[450px] py-[40px] w-[145px] bg-slate-300 border-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage_hellow;
