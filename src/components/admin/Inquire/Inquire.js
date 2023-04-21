import React, { useNavigate, useCallback, useState } from "react";

import "./MyPage.css";
// import classes from "./Buy.module.css";

import Pagination from "./Pagination";

// 날짜 관련 함수 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

// 임시 데이터 연결
import { SellTempData } from "./Data";

// 데이터
export default function Inquire() {
  // 임시 데이터 연결
  const [data, setData] = useState(SellTempData);

  //정렬
  // data의 키값을 받아 저장 기본 id순으로 설정
  const [priceFilter, setPriceFilter] = useState("id");
  function handleChange(e) {
    setPriceFilter(e.target.value);
  } // select의 value 값을 받아 setPriceFilter에 저장함
  const Options = [{ key: "day", value: "날짜" }];
  // 정렬 순서 곱셈 활용
  const [direction, setDirection] = useState(1);
  const handleAscClick = () => setDirection(1);
  const handleDescClick = () => setDirection(-1);

  const sortedItems = data.sort((a, b) =>
    a[priceFilter] > b[priceFilter]
      ? direction
      : a[priceFilter] < b[priceFilter]
      ? direction * -1
      : 0
  );

  // 페이지 수
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 접수 취소 데이터를 보내기
  const onReCheck = (targetId) => {
    // state를 취소 상태로 바꾸기
    // 임시로 대충 짬 작동안함
    data.targetId = { state: "cancellation" };
  };

  // 날짜 입력 받기
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 상단 버튼
  let updata = ["전체", "접수중", "접수완료"];

  let [btnActive, setbtnActive] = useState(false);

  const toggleActive = (e) => {
    setbtnActive((prev) => {
      return e.target.value;
    });
  };

  return (
    <>
      <h3>문의사항</h3>
      <hr />
      {/* 상단 현재 배송중인 판매 신청 목록 */}
      <div>
        <div>
          <div>
            시작일을 선택해 주세요
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              className=" bg-slate-300"
            />
          </div>
          <div>
            종료일을 선택해 주세요
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              className=" bg-slate-300"
            />
          </div>
        </div>

        <div>
          {updata.map((item, idx) => {
            return (
              <div key={item}>
                <button
                  key={idx}
                  value={idx}
                  className={"btn" + (idx == btnActive ? "active" : "")}
                  onClick={toggleActive}
                >
                  {item}
                </button>
              </div>
            );
          })}
        </div>

        {/* 상단 현재 배송중인 판매 신청 목록 end*/}
        <div>
          <div>
            <div>
              페이지 당 표시할 게시물 수:&nbsp;
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
            </div>
          </div>
          {/* 상단 버튼 매뉴 */}
          <div>
            {/* 정렬조회 */}
            <select
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
            <div>
              <button onClick={handleAscClick}>낮은순</button>
              <button onClick={handleDescClick}>높은순</button>
            </div>
          </div>
          {/* 상단 버튼 매뉴 끝*/}
          {/*  리스트 */}
          <div>
            {/* 리스트 상단 키값 */}
            <div>
              <div>
                <div>제목 </div>
                <div>날짜</div>
                <div>접수중/접수완료</div>
              </div>
            </div>
            {/* 리스트 상단 키값  끝*/}
            {/* 리스트 벨류값 */}
            <div>
              {data
                .filter((day) =>
                  new Date(day.day) > new Date(startDate)
                    ? true
                    : new Date(day.day).getDate() >= startDate.getDate()
                    ? true
                    : false && new Date(day.day) <= new Date(endDate)
                )
                .slice(offset, offset + limit)
                .map((data, key) => (
                  <div key={key}>
                    <div>
                      <label htmlFor={`select-${data.id}`}>
                        <div>
                          <div>
                            {/* 제목 :  */}
                            <p>{data.title}</p>
                          </div>
                          {/* 리스트 날짜*/}
                          <div>
                            {/* 날짜 출력 */}
                            <p> {data.day}</p>
                          </div>
                          {/* 리스트 날짜 끝 */}
                          {/* 리스트 접수중 접수완료 */}
                          <div>
                            <div>
                              <span>
                                {data.state === "ing"
                                  ? "접수중"
                                  : data.state === "comp"
                                  ? "접수완료"
                                  : "접수취소"}
                              </span>
                              <div>
                                {data.state === "ing" ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`${data.title} 접수 취소하시겠습니까?`)) {
                                        onReCheck(data.id);
                                        alert(`접수 취소되었습니다.`);
                                      } else {
                                      }
                                    }}
                                  >
                                    X
                                  </button>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            </div>
                            {/* 리스트 접수중 접수완료 끝  */}
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
            </div>
            {/* 리스트 벨류값 끝 */}
            <div>
              <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
