import React from "react";

export const Content = () => {
  return (
    <form action="">
      <div className="absolute top-[70px] left-[190px] w-[600px] text-[14px] h-[450px] bg-slate-400">
        <div className="mt-4 ml-4 bg-gray-50 w-[560px] rounded-md">
          <label className="mx-2" for="first_name">
            {" "}
            제품 이름 :
          </label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border w-[460px] ml-2"
            placeholder="정확하게 작성해주세요"
            required
          />
        </div>
        <div className="mt-4 ml-4 bg-gray-50 w-[560px] rounded-md">
          <label
            for="first_name"
            className=" ml-2 mb-2 text-sm font-medium  bg-gray-50 border w-[460px]"
          ></label>
          희망 판매가 :
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 border w-[460px] ml-1"
            placeholder="판매가격은 검증 후 변경될 수 있습니다"
            required
          ></input>
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="multiple_files"
          >
            Upload multiple files
          </label>
          <div className="mt-4 ml-4 bg-gray-50 w-[560px] rounded-md">
            <p className="ml-2 text-sm font-medium  bg-gray-50 border w-[460px]">
              이미지 첨부
              <input
                className="block w-[545px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
              ></input>
            </p>
          </div>
        </div>
        <div className="mt-4 ml-4 bg-gray-50 w-[560px] h-[250px] rounded-md">
          <label
            for="large-input"
            className=" ml-2 mb-2 text-sm font-medium  bg-gray-50 border w-[460px]"
          ></label>
          특이사항
          <textarea
            type="text"
            id="large-input"
            className="block ml-2 w-[545px] h-[220px] p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="구입시기, 구입경로 등 자세하게 작성해주세요"
            required
          ></textarea>
        </div>
      </div>
    </form>
  );
};
