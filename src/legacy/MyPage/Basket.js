import React, { useEffect } from "react";
import { useState } from "react";
import { fetchWatches } from '../api';
import "./MyPage.css";

// import Pagination from "./Pagination";

export default function Basket() {
  // 데이터
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onLoad = async () => {
    try {
      const getData = await fetchWatches()

      // console.log(getData);
      // console.log(`getData["data"] : ${getData['data']}`);
      console.log(getData.data);
      setData(getData.data);
      // console.log(watchData); //? 왜 여기에는 찍히지가 않는 걸까용?

      setIsLoading((prev) => !prev); //false -> true (이전 값 -> 역전)
    } catch (e) {}
  };
  useEffect(() => {
    if (isLoading === false) {
      onLoad();
    }
  }, [isLoading]);
  console.log(data.length);

  // 체크된 아이템을 담을 배열 값만 저장함
  const [checkItems, setCheckItems] = useState([]);

  // 체크 아이템과 데이터를 연결 시켜주는 카피체크아이템
  const copyCheckItems = checkItems.map(
    (id) => data.find((e) => e.id === id)
    // console.log("힘들다 ", data.money)
  );

  // 합계 구하는 공식
  let result2 = data.reduce((prev, cur) => {
    prev += cur.price;
    return prev;
  }, 0);

  // 체크박스 단일 선택 id값을 받아 저장함
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  console.log(checkItems);

  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  //정렬
  // data의 키값을 받아 저장 기본 id순으로 설정
  const [priceFilter, setPriceFilter] = useState("id");
  function handleChange(e) {
    setPriceFilter(e.target.value);
  } // select의 value 값을 받아 setPriceFilter에 저장함
  const Options = [
    { key: "money", value: "money" },
    { key: 3, value: "3번 옵션" },
    { key: 4, value: "4번 옵션" },
    { key: 5, value: "5번 옵션" },
  ];
  // 정렬 순서 곱셈 활용
  const [direction, setDirection] = useState(1);

  const handleAscClick = () => setDirection(1);

  const handleDescClick = () => setDirection(-1);

  const sortedItems = data.sort(
    (a, b) => direction * (a[priceFilter] - b[priceFilter])
  );

  // 페이지 수
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 삭제
  const onRemove = (targetId) => {
    setData(data.filter((data) => data.id !== targetId));
  };
  // 체크된 상품들만 모은 id checkArr - 체크된 상품들
  // checkItems
  const allonRemove = (targetId) => {
    if (window.confirm(`${targetId}가 삭제?`)) {
      setData(data.filter((data) => data.id !== targetId));
      alert(`${targetId}가 삭제?`);
    } else {
      alert("ㅇㅋ 삭제취소");
    }
  };

  return (
    <>
      <h3 className="flex text-[25px] font-bold">장바구니</h3>
      <div className="flex justify-center p-[14px] bg-gray-50 border-b border-gray-100">
        <div className=" bg-white border border-gy-100 h-[30px] text-[15px]">
          <label>
            &nbsp;&nbsp;페이지 당 표시할 게시물 수 :&nbsp;
            <select
              type="number"
              value={limit}
              onChange={({ target: { value } }) => setLimit(Number(value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>
        {/* 상단 버튼 메뉴 */}
        <button
          className=" bg-white border border-gy-100 h-[30px] text-[15px]"
          type="button"
          onClick={() => {
            if (window.confirm(`${checkItems.length}개 삭제하시겠습니까?`)) {
              checkItems.map((id) => onRemove(id));
              alert(`${checkItems.length}개 삭제완료`);
            }
            // else {
            //   alert("ㅇㅋ 삭제취소");
            // }
          }}
        >
          선택 삭제
        </button>
        <select
          className="mp-botton"
          type="button"
          name="my-select"
          id="fruit"
          onChange={handleChange}
          value={priceFilter}
        >
          {Options.map((item, index) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <button className="mp-botton" onClick={handleDescClick}>
          높은순
        </button>
        <button className="mp-botton" onClick={handleAscClick}>
          낮은순
        </button>
      </div>
      {/*  리스트 */}
      <table className=" relative   top-[70px] w-[800px]">
        {/* 리스트 상단 키값 */}
        <thead className="  relative bg-slate-300 w-[800px] h-{full} ">
          <tr>
            <th className=" text-center px-[100px]">상품명</th>
            <th className=" text-center px-[80px]">가격</th>
            {/* <span className=" text-center px-[50px]">수량</span> */}
            <input
              className=" text-center float-right mr-[25px] mt-[3px]"
              type="checkbox"
              name="select-all"
              onChange={(e) => handleAllCheck(e.target.checked)}
              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
              checked={checkItems.length === data.length ? true : false}
            />
            <th className=" text-center float-right mr-[40px] px-[px]">삭제</th>
          </tr>
        </thead>
        {/* 리스트 상단 키값  끝*/}
        {/* 리스트 벨류값 */}
        <tbody className="relative  px-[5px] py-[5px] ">
          <div className=" relative my-[15px]"></div>
          {data.slice(offset, offset + limit)?.map((data, key) => (
            <tr
              className="w-[800px] h-[100px] border-2   border-cyan-400  "
              key={key}
            >
              <td>
                <label htmlFor={`select-${data.id}`}>
                  <div className=" h-[80px] mx-[5px] my-[5px]">
                    {/* 리스트 이름 */}
                    <div className=" relative w-1/2 left-[5px] top-[5px]">
                      <img
                        className=" absolute h-[70px] w-[70px]   "
                        src={data.img_urls[0]}
                        alt=""
                      />
                      <div className="absolute left-[80px]">
                        {/* 상품 이름 : */}
                        <p>
                          제품명 : {data.name}
                          <br />
                          등록일 : {data.register_date.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    {/* 리스트 이름 끝 */}
                    {/* 리스트 가격 */}
                    <td>
                      <div className=" absolute left-[450px] w-[200px] h-full text-[13px] pt-[8px]">
                        {/* 출력 */}
                        <div className="float-left ">
                          <p>상품 금액 : {data.price} 원 </p>
                          <br />
                          <p>등급 : {data.grade}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="absolute left-[665px] h-full w-[130px]">
                        <div className=" absolute h-full text-[13px] pt-[22px]">
                          <div className="text-center ">
                            <button
                              className="rounded-full bg-slate-300 py-[5px] px-[20px] my-[2px]"
                              type="button"
                              onClick={() => {
                                if (window.confirm(`${data.id} 삭제?`)) {
                                  onRemove(data.id);
                                  alert(`${data.id} 삭제완료`);
                                } else {
                                  alert("ㅇㅋ 삭제취소");
                                }
                              }}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                        {/* 리스트 보관 삭제 끝  */}
                        {/* 리스트 체크박스 */}
                        <div className=" absolute right-[20px] pt-[28px]">
                          <input
                            type="checkbox"
                            id={`select-${data.id}`}
                            name={`select-${data.id}`}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, data.id)
                            }
                            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                            checked={
                              checkItems.includes(data.id) ? true : false
                            }
                          />
                        </div>
                      </div>
                    </td>
                    {/* 리스트 체크박스 끝 */}
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
        {/* 리스트 벨류값 끝 */}
        <div className=" relative left-[400px] my-[20px]">
          {/* <Pagination
            total={data.length}
            limit={limit}
            page={page}
            setPage={setPage}
          /> */}
        </div>
      </table>
      {/* 리스트 하단 결제창 */}
      <div className=" relative top-[60px] bg-slate-300 h-[120px] ">
        {/* 금액박스 */}
        <div className="absolute w-1/2 ">
          <div className=" float-left ml-[60px] mt-[7px]">
            <p>총 수량 :</p>
            <br />
            <br />
            <p className="text-[20px]">총 상품 금액 : </p>
          </div>

          <p className="  absolute mt-[78px] right-[50px] text-[20px]">
            {result2} 원
          </p>
          <div className=" float-right mr-[20px]  mt-[7px]">
            <p className="">{data.length}개</p>
            <br />
            <br />
            <p className=" text-[20px]"></p>
          </div>
        </div>
        {/* 우측 결제버튼 */}
        <div className=" absolute left-[41px]  mt-[20px] w-1/2">
          <button className="text-[25px] rounded-full bg-slate-400 m-[10px] px-[20px]">
            구매하기
          </button>
        </div>

        <div className="absolute right-[50px] bottom-[15px] w-[300px]">
          <div className="float-left ml-[20px]"></div>
          <div className="float-right"></div>
        </div>
      </div>
    </>
  );
}
