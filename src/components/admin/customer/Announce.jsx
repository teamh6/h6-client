import React from "react";

export default function Announce() {
  const charList = [
    "[비상 비상! ] ",
    "[우리가 해야할 것들이 산이 넘어가니 ] ",
    "[빠른시간 안에 이것들을 해결하고 ] ",
    "[취업하자!] ",
  ];
  return (
    <>
      <div>
        <div className="">
          <h3 className=" pt-2 pb-8 text-[15px] w-[300px]">공지사항</h3>
        </div>
      </div>

      <div>
        <div className="relative">
          <hr className="absolute w-[600px] h-[1px] mx-auto my-[6px] bg-gray-50 top-[-5px]" />
        </div>
      </div>

      <ul className="">
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
