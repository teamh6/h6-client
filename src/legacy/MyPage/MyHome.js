import React from "react";
import "./MyPage.css";

export default function MyHome() {
  return (
    <>
      {/* w가 위치를 잡아줘 스크롤을 줄여도 글자 위치를 고정 시켜줌 */}
      <h3 className=" pt-6 pb-8 text-[25px] w-[300px]">ㅇㅇ님 반갑습니다!</h3>
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
          <p className="text-center">승 인</p>
          <p className="text-center">0</p>
        </div>
        <div className="absolute left-[450px] py-[20px] w-[145px] bg-slate-300 border-2">
          <p className="text-center">거 절</p>
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
    </>
  );
}
