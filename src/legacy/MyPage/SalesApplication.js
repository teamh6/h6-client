import React from "react";
import "./MyPage.css";

export default function SalesApplication() {
  return (
    <>
      <h3>판매신청 페이지</h3>
      {/* 상단 현재 진행중인 판매 신청 목록 */}
      <div className=" relative top-[20px] left-[50px] w-[900px]">
        <p className="text-[14px]  ">판매 신청 목록</p>
        {/* 박스의 시작 */}
        <div className="relative top-[20px]">
          <div className="absolute py-[10px] w-[180px] bg-slate-300 border-2 ">
            <p className="float-left ml-[30px]">신 청</p>
            <p className=" float-right mr-[30px]">0</p>
          </div>
          <div className="absolute left-[200px] py-[10px] w-[180px] bg-slate-300 border-2">
            <p className="float-left ml-[30px]">검토 중</p>
            <p className=" float-right mr-[30px]">0</p>
          </div>
          <div className="absolute left-[400px] py-[10px] w-[180px] bg-slate-300 border-2">
            <p className="float-left ml-[30px]">승 인</p>
            <p className=" float-right mr-[30px]">0</p>
          </div>
          <div className="absolute left-[600px] py-[10px] w-[180px] bg-slate-300 border-2">
            <p className="float-left ml-[30px]">거 절</p>
            <p className=" float-right mr-[30px]">0</p>
          </div>
        </div>
        {/* 박스의 end */}
        {/* 상단 현재 진행중인 판매 신청 목록 end*/}
        <div className=" relative top-[100px] ">
          리스트는 장바구니 완성 후 복붙 할 예정
        </div>
      </div>
    </>
  );
}
