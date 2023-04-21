import React, { useState, useEffect, useContext, useMemo } from "react";
import classes from "./Buy.module.css";

// 날짜 관련 함수 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Pagination from "../Pagination";
import { MemberContext } from "../../../context";
import { loadList } from "../../../api/purchase";
import { priceConverter } from "../../../common/utils";
import {
  orderByGrade,
  orderByName,
  orderByPrice,
  orderByRegisterDate,
} from "../../../common/utils/orderFunction";

// 데이터
export default function Buy() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //정렬
  // data의 키값을 받아 저장 기본 id순으로 설정
  const [orderFilter, setOrderFilter] = useState("name");
  function handleChange(e) {
    setOrderFilter(e.target.value);
  } // select의 value 값을 받아 setPriceFilter에 저장함
  const Options = [
    { key: "name", value: "이름순" },
    { key: "register_date", value: "판매등록일순" },
    { key: "price", value: "가격순" },
    { key: "grade", value: "등급순" },
  ];
  // 정렬 순서 곱셈 활용
  const [direction, setDirection] = useState(1);

  const handleAscClick = () => setDirection(1);

  const handleDescClick = () => setDirection(-1);

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
  // 페이지 수
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [startDate, setStartDate] = useState(new Date("2022-02-10"));
  const [endDate, setEndDate] = useState(new Date());

  // 상단 버튼
  let updata = ["전체"];

  let [btnActive, setbtnActive] = useState(0);

  const toggleActive = (e) => {
    console.log("btnActive: ", btnActive);
  };
  const memberId = useContext(MemberContext);
  const loadPurchaseList = async () => {
    try {
      const getData = await loadList(memberId);
      setData(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };

  useEffect(() => {
    loadPurchaseList();
  }, [isLoading]);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.condition}>
          <h3>구매내역</h3>
          <div className={classes.top}>
            {updata.map((item, idx) => {
              // console.log("idx : " + idx);
              return (
                <div key={item + idx}>
                  <button
                    value={idx}
                    className={idx === btnActive ? classes.active : classes.non_active}
                    onClick={() => {
                      setbtnActive(idx);
                      toggleActive(idx);
                    }}
                  >
                    <span className={classes.length}>{data.length}</span>
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
              {Options.map((item, index) => (
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
            <button onClick={handleDescClick}>높은순</button>
            <button onClick={handleAscClick}>낮은순</button>
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
              .map((watch, key) => {
                let totalPrice = 0;
                totalPrice += watch.price;
                return (
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
                        {/* 구매날짜 */}
                        <div className={classes.buydate}>
                          <p>{watch.register_date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
