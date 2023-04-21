import React from "react";

export const Upper = () => {
  return (
    <div className="relative mt-[20px] ml-[150px]">
      <div className=" absolute mt-1 ml-[120px] px-[100px] py-[100px] bg-slate-400">
        <img src="" alt="" />
        <div>상품이미지</div>
      </div>

      <div className=" absolute mt-[20px] ml-[450px] x-[100px] y-[100px]  py-[2px] bg-slate-400">
        <p>
          상품 이름 : <input className="bg-slate-400" type="text" />
        </p>
        <p className="absolute mt-[20px] ml-[0px] x-[100px] y-[100px]  py-[2px] bg-slate-400">
          상품 가격 : <input className="bg-slate-400" type="text" />
        </p>
      </div>
      <div className="absolute mt-[180px] ml-[460px]  ">
        <ul>
          <li className=" inline-block mr-[20px] px-[20px] py-[2px] bg-slate-400">
            <button>찜 : 0</button>
          </li>
          <li className=" inline-block mr-[20px] px-[20px] py-[2px] bg-slate-400">
            <button>장바구니</button>
          </li>
          <li className=" inline-block mr-[20px] px-[20px] py-[2px] bg-slate-400">
            <button>바로구매</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
