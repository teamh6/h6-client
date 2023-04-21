import React, { useState, useEffect, useContext, useMemo } from "react";
import classes from "./Sale.module.css";

// 날짜 관련 함수 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { MemberContext } from "../../../context";
import {
  countCase,
  countWatches,
  deleteWatch,
  loadWatches,
  loadWatchesCase,
  updateWatch,
} from "../../../api/watches";
import Pagination from "../../mypage/Pagination";
import { NavLink } from "react-router-dom";
import { priceConverter } from "../../../common/utils";
import {
  orderByGrade,
  orderByName,
  orderByPrice,
  orderByRegisterDate,
} from "../../../common/utils/orderFunction";

export default function SaleApplyList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 체크된 아이템을 담을 배열 값만 저장함
  const [checkItems, setCheckItems] = useState([]);

  const [allCount, setAllCount] = useState(0);
  const [delayCount, setDelayCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [acceptCount, setAcceptCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);

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
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 chec  kItems 상태 업데이트
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
  let updata = ["전체", "검토대기중", "검토중", "승인완료", "판매거절", "판매완료"];

  let [btnActive, setbtnActive] = useState(0);
  const memberId = useContext(MemberContext);
  const toggleActive = (e) => {
    console.log("btnActive: ", btnActive);
    console.log(e);
  };

  //삭제
  const onRemove = async (watchId) => {
    try {
      const getData = await deleteWatch(watchId);
      // console.log(getData.data);
      if (checkItems.length === 1 || checkItems.length === 0) {
        alert("등록 취소 되었습니다.");
      }
      setIsLoading(false);
    } catch (e) {}
  };
  //검토
  const onExam = async (watch) => {
    try {
      const getData = await updateWatch({
        watch_id: watch.watch_id,
        name: watch.name,
        price: watch.price,
        description: watch.description,
        category: watch.category,
        grade: watch.grade,
        warranty: 1,
      });
      if (checkItems.length === 1 || checkItems.length === 0) {
        getData.data === 1 ? alert("검토 목록으로 이동되었습니다.") : alert("오류!");
      }
      setIsLoading(false);
    } catch (e) {}
  };

  const onSelectRemove = (param) => {
    for (let idx in param) {
      onRemove(param[idx]);
    }
    if (checkItems.length > 1) {
      alert(`${checkItems.length}개 등록 취소 되었습니다.`);
    }
    setCheckItems([]);
  };

  const onSelectExam = async (param) => {
    for (let idx in param) {
      data.map((watch, i) => {
        if (watch.watch_id === param[idx]) {
          onExam(watch);
        }
      });
    }
    if (checkItems.length > 1) {
      alert(`${checkItems.length}개 검토 목록으로 이동되었습니다.`);
    }
    setCheckItems([]);
  };

  const onloadApplyList = async () => {
    try {
      const getData = await loadWatches();
      setData(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };
  const onloadCaseList = async (param) => {
    if (param !== 5) {
      try {
        const getData = await loadWatchesCase({
          warranty: param,
          selling: 0,
        });
        setData(getData.data);
        // console.log(getData.data);
        setIsLoading(true);
      } catch (e) {}
    } else {
      try {
        const getData = await loadWatchesCase({
          warranty: 2,
          selling: 1,
        });
        setData(getData.data);
        setIsLoading(true);
      } catch (e) {}
    }
  };

  const loadApplyCount = async (param) => {
    if (param !== 5) {
      try {
        const getData = await countCase({
          warranty: param,
          selling: 0,
        });
        if (param === 0) {
          setDelayCount(getData.data);
        }
        if (param === 1) {
          setExamCount(getData.data);
        }
        if (param === 2) {
          setAcceptCount(getData.data);
        }
        if (param === -1) {
          setRejectCount(getData.data);
        }
      } catch (e) {}
    } else {
      try {
        const getData = await countCase({
          warranty: 2,
          selling: 1,
        });
        // console.log(getData.data);
        setSoldCount(getData.data);
      } catch (e) {}
    }
  };
  const loadAllCount = async () => {
    try {
      const getData = await countWatches();
      setAllCount(getData.data);
    } catch (e) {}
  };
  const initCount = () => {
    loadAllCount();
    loadApplyCount(0);
    loadApplyCount(1);
    loadApplyCount(2);
    loadApplyCount(-1);
    loadApplyCount(5);
  };

  useEffect(() => {
    initCount();

    if (btnActive === 0) {
      onloadApplyList();
    }
    if (btnActive === 1) {
      onloadCaseList(0);
    }
    if (btnActive === 2) {
      onloadCaseList(1);
    }
    if (btnActive === 3) {
      onloadCaseList(2);
    }
    if (btnActive === 4) {
      onloadCaseList(-1);
    }
    //판매 완료
    if (btnActive === 5) {
      onloadCaseList(5);
    }
  }, [isLoading]);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.condition}>
          <h3>판매요청내역</h3>
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
                    <span className={classes.length}>
                      {idx === 0
                        ? allCount
                        : idx === 1
                        ? delayCount
                        : idx === 2
                        ? examCount
                        : idx === 3
                        ? acceptCount
                        : idx === 4
                        ? rejectCount
                        : soldCount}
                    </span>
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
            {btnActive === 1 ? (
              <button
                style={{ color: "#ef6253ed", fontWeight: "500" }}
                type="button"
                onClick={() => {
                  if (window.confirm(`${checkItems.length}개 검토 하시겠습니까?`)) {
                    onSelectExam(checkItems);
                  } else {
                    alert("검토가 취소되었습니다");
                  }
                }}
              >
                선택 검토
              </button>
            ) : (
              <button
                style={{ color: "#ef6253ed", fontWeight: "500" }}
                type="button"
                onClick={() => {
                  if (window.confirm(`${checkItems.length}개 삭제 하시겠습니까?`)) {
                    onSelectRemove(checkItems);
                  } else {
                    alert("삭제가 취소되었습니다");
                  }
                }}
              >
                선택 삭제
              </button>
            )}
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
                <div className={classes.list} key={watch.watch_id + watch.name}>
                  <div htmlFor={`select-${watch.watch_id}`}>
                    {/* 제품정보 */}
                    <div className={classes.product}>
                      {watch.warranty === 0 ? (
                        <div>
                          <img src={process.env.REACT_APP_IMG_URL + watch.img_urls[0]} alt="" />
                        </div>
                      ) : (
                        <NavLink
                          to={"/admin/exam/" + watch.watch_id}
                          state={{ watch_id: watch.watch_id }}
                          key={watch.watch_id}
                        >
                          <div>
                            <img src={process.env.REACT_APP_IMG_URL + watch.img_urls[0]} alt="" />
                          </div>
                        </NavLink>
                      )}
                      <div>
                        <ul>
                          <li className={classes.name}>{watch.name}</li>
                          <li className={classes.other}>
                            상품 금액 : {priceConverter(watch.price)}
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
                        checked={checkItems.includes(watch.watch_id)}
                      />
                      <div className={classes.application}>
                        <ul>
                          <li>
                            <p>
                              {watch.selling === 0 && watch.warranty === 0
                                ? "검토대기중"
                                : watch.selling === 0 && watch.warranty === 1
                                ? "검토중"
                                : watch.selling === 0 && watch.warranty === 2
                                ? "승인완료"
                                : watch.selling === 0 && watch.warranty === -1
                                ? "판매거절"
                                : watch.selling === 1 && watch.warranty === 2
                                ? "판매완료"
                                : "오류"}
                            </p>
                          </li>
                          <li>
                            {watch.warranty === 0 ? (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`검토 하시겠습니까?`)) {
                                    onExam(watch);
                                  } else {
                                    alert("검토가 취소되었습니다");
                                  }
                                }}
                              >
                                검토
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`삭제 하시겠습니까?`)) {
                                    onRemove(watch.watch_id);
                                  } else {
                                    alert("삭제가 취소되었습니다");
                                  }
                                }}
                              >
                                등록 취소
                              </button>
                            )}
                          </li>
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
