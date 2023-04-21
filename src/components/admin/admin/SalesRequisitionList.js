import React from "react";
import "./MyPage.css";
export default function SalesRequisitionList() {
  const charList = [
    "[] WELCOME DRAW - 아디다스1",
    "[] WELCOME DRAW - 아디다스2",
    "[] WELCOME DRAW - 아디다스3",
    "[] WELCOME DRAW - 아디다스4",
  ];
  return (
    <>
      <div>
        <div className="">
          <h3 className=" pt-2 pb-8 text-[15px] w-[300px]">판매 요청 목록</h3>
        </div>
      </div>

      <div>
        <div className="relative">
          <hr className="absolute w-[60 0px] h-[2.5px] mx-auto my-[6px] bg-gray-900 top-[-30px]" />
        </div>
      </div>

      <ul className="">
        {/* <li>
          <div>
            <div className="relative w-[600px]">`
              <div>
                <p className="absolute pt-[-5px] text-sm">
                  [이벤트 발표] WELCOME DRAW - 아디다스 가젤
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="relative">
              <hr className="absolute w-[600px] h-[1px] mx-auto my-[6px] bg-gray-50 top-[20px]" />
            </div>
          </div>
        </li> */}
        {charList.map((item, index) => {
          return (
            <li key={item + index}>
              <div>
                <div className="relative w-[600px]">
                  <div>
                    <p className="">{item}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="relative">
                  <hr className="absolute w-[600px] h-[1px] mx-auto my-[6px] bg-gray-50 top-[-5px]" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
