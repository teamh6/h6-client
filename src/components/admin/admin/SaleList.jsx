import React, { useState, useEffect, useContext, useMemo } from "react";
import classes from "./Sale.module.css";

// 날짜 관련 함수 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { MemberContext } from "../../../context";
import { countCase, deleteWatch, loadWatchesCase } from "../../../api/watches";
import Pagination from "../../mypage/Pagination";
import { priceConverter } from "../../../common/utils";
import {
  orderByGrade,
  orderByName,
  orderByPrice,
  orderByRegisterDate,
} from "../../../common/utils/orderFunction";

export default function SaleList() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [sellCount, setSellCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);

  // 체크된 아이템을 담을 배열 값만 저장함
  const [checkItems, setCheckItems] = useState([]);

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

  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      let idArray = [];
      data.forEach((el) => idArray.push(el.watch_id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  //정렬
  // data의 키값을 받아 저장 기본 id순으로 설정
  const [orderFilter, setOrderFilter] = useState("name");
  function handleChange(e) {
    setOrderFilter(e.target.value);
  } // select의 value 값을 받아 setPriceFilter에 저장함
  const options = [
    { key: "name", value: "이름순" },
    { key: "register_date", value: "판매등록일순" },
    { key: "price", value: "가격순" },
    { key: "grade", value: "등급순" },
  ];
  // 정렬 순서 곱셈 활용
  const [direction, setDirection] = useState(1);

  //data를 불러와 정렬된 데이터 만들어 주기
  const sortedData = useMemo(() => {
    const list = [...data];
    const order = direction === 1 ? "asc" : "desc";
    if (orderFilter === "name") {
      return list.sort(orderByName(order));
    }
    if (orderFilter === "register_date") {
      return list.sort(orderByRegisterDate(order));
    }
    if (orderFilter === "price") {
      return list.sort(orderByPrice(order));
    }
    return list.sort(orderByGrade(order));
  }, [data, direction, orderFilter]);

  const handleAscClick = () => setDirection(1);

  const handleDescClick = () => setDirection(-1);

  // 페이지 수
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 날짜 입력 받기
  const [startDate, setStartDate] = useState(new Date("2022-02-10"));
  const [endDate, setEndDate] = useState(new Date());

  // 상단 버튼
  let updata = ["판매중", "판매완료"];

  let [btnActive, setbtnActive] = useState(0);
  // const memberId = useContext(MemberContext);
  const toggleActive = (e) => {
    // console.log("btnActive: ", btnActive);
  };

  const onloadApplyList = async (param) => {
    try {
      const getData = await loadWatchesCase({
        warranty: 2,
        selling: param,
      });
      setData(getData.data);
      // console.log(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };

  const loadSellCount = async (param) => {
    try {
      const getData = await countCase({
        warranty: 2,
        selling: param,
      });
      if (param === 0) {
        setSellCount(getData.data);
        return;
      }
      if (param === 1) {
        setSoldCount(getData.data);
        return;
      }
    } catch (e) {}
  };

  const onRemove = async (watchId) => {
    try {
      const getData = await deleteWatch(watchId);
      // console.log(getData.data);
      if (checkItems.length === 1 || checkItems.length === 0) {
        alert("판매 취소 되었습니다.");
      }
      setIsLoading(false);
    } catch (e) {}
  };
  const onSelectRemove = (param) => {
    for (let idx in param) {
      onRemove(param[idx]);
    }
    if (checkItems.length > 1) {
      alert(`${checkItems.length}개 판매 취소 되었습니다.`);
    }
    setCheckItems([]);
  };

  useEffect(() => {
    if (btnActive === 0) {
      onloadApplyList(0);
      loadSellCount(0);
      loadSellCount(1);
    } else {
      onloadApplyList(1);
    }
  }, [isLoading]);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.condition}>
          <h3>판매내역</h3>
          <div className={classes.top}>
            {updata.map((item, idx) => {
              return (
                <div key={item + idx}>
                  <button
                    value={idx}
                    className={idx === btnActive ? classes.active : classes.non_active}
                    onClick={() => {
                      setbtnActive(idx);
                      toggleActive(idx);
                      setIsLoading(false);
                      setPage(1);
                      setCheckItems([]);
                    }}
                  >
                    <span className={classes.length}>{idx === 0 ? sellCount : soldCount}</span>
                    <br />
                    <span className={classes.item}>{item}</span>
                  </button>
                </div>
              );
            })}
          </div>
          {/* 기간 설정 */}
          <div className={classes.date}>
            <div style={{ display: "flex" }}>
              <DatePicker
                className={classes.datepicker}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale={ko}
                dateFormat="yyyy-MM-dd"
              />
              &nbsp;~&nbsp;
              <DatePicker
                className={classes.datepicker}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                locale={ko}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>
        {/* 정렬 */}
        <div className={classes.middle}>
          {/* 왼쪽상단버튼 */}
          <div className={classes.lefttop}>
            <select
              type="button"
              name="my-select"
              id="fruit"
              onChange={handleChange}
              value={orderFilter}
            >
              {options.map((item, index) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            <button>
              한 페이지에 표시할 제품 수&nbsp;
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
            </button>
          </div>
          {/* 오른쪽 상단 버튼 */}
          <div className={classes.righttop}>
            <button onClick={handleAscClick}>낮은순</button>
            <button onClick={handleDescClick}>높은순</button>
            <button>
              전체선택
              <input
                style={{ marginLeft: "5px" }}
                type="checkbox"
                name="select-all"
                onChange={(e) => handleAllCheck(e.target.checked)}
                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                checked={
                  checkItems.length !== 0
                    ? checkItems.length === data.length
                      ? true
                      : false
                    : false
                }
              />
            </button>
            <button
              style={{ color: "#ef6253ed", fontWeight: "500" }}
              type="button"
              onClick={() => {
                if (window.confirm(`${checkItems.length}개 판매취소 하시겠습니까?`)) {
                  onSelectRemove(checkItems);
                } else {
                  alert("판매내역으로 돌아갑니다.");
                }
              }}
            >
              선택 삭제
            </button>
          </div>
        </div>

        {/* 제품리스트 */}
        <div style={{ minHeight: "300px" }}>
          <div className={classes.container}>
            {sortedData
              .filter((watch) =>
                new Date(watch.register_date) > new Date(startDate)
                  ? true
                  : new Date(watch.register_date).getDate() >= startDate.getDate()
                  ? true
                  : false && new Date(watch.register_date) <= new Date(endDate)
              )
              .slice(offset, offset + limit)
              .map((watch, key) => (
                <div className={classes.list} key={key}>
                  <div htmlFor={`select-${watch.watch_id}`}>
                    {/* 제품정보 */}
                    <div className={classes.product}>
                      <div>
                        <img src={process.env.REACT_APP_IMG_URL + watch.img_urls[0]} alt="" />
                      </div>
                      <div>
                        <ul>
                          <li className={classes.name}>{watch.name}</li>
                          <li className={classes.other}>
                            상품 금액 : {priceConverter(watch.price)}원
                          </li>
                          <li className={classes.other}>등급 : {watch.grade}</li>
                        </ul>
                      </div>
                      {/* 신청날짜 */}
                      <div className={classes.applicationdate}>
                        <p>{watch.register_date}</p>
                      </div>
                      <input
                        style={{ marginRight: "28px" }}
                        type="checkbox"
                        id={`select-${watch.watch_id}`}
                        name={`select-${watch.watch_id}`}
                        onChange={(e) => handleSingleCheck(e.target.checked, watch.watch_id)}
                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                        checked={checkItems.includes(watch.watch_id) ? true : false}
                      />
                      <div className={classes.application}>
                        <ul>
                          <li>
                            <p>
                              {watch.selling === 1 && watch.warranty === 2
                                ? "판매완료"
                                : watch.selling === 0 && watch.warranty === 2
                                ? "판매중"
                                : "오류"}
                            </p>
                          </li>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`${watch.name} 판매취소 하시겠습니까?`)) {
                                onRemove(watch.watch_id);
                              } else {
                                alert("판매내역으로 돌아갑니다.");
                              }
                            }}
                          >
                            취소
                          </button>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {data.length !== 0 ? (
          <div className={classes.pagenation}>
            <Pagination total={data.length} limit={limit} page={page} setPage={setPage} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
