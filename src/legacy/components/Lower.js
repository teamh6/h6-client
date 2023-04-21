import React from "react";

export const Lower = () => {
  return (
    <>
      <div className=" relative min-h-[500px] pb-[10px] h-full">
        <div className=" absolute mt-[250px] ml-10 ">
          <hr />
          <div className=" absolute mt-[20px] ml-[150px]">
            <ul>
              <li>상품 설명</li>
              <li className=" mt-[10px] ">
                <textarea className="w-[900px] h-[200px] bg-slate-400">
                  상품 설명 들어감
                </textarea>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
