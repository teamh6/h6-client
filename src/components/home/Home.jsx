import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import { fetchWatches, loadWatches } from "../../api";
import classes from "./Home.module.css";
import { loadWatchesCase, loadWatchesCategory } from "../../api/watches";
import Pagination from "../mypage/Pagination";
import { priceConverter } from "../../common/utils";
import {
  orderByGrade,
  orderByLikes,
  orderByName,
  orderByPrice,
} from "../../common/utils/orderFunction";

const Home = () => {
  const [data, setData] = useState([]);
  //정렬 순서
  const [direction, setDirection] = useState(1);
  const [orderFilter, setOrderFilter] = useState("name");
  //페이지수
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoadisng] = useState(false);
  const offset = (page - 1) * limit;
  // location -> 경로의 값을 알 수 있음.
  const location = useLocation();
  const handleChange = (e) => {
    setOrderFilter(e.target.value);
  };

  const sortedData = useMemo(() => {
    const list = [...data];
    const order = direction === 1 ? "asc" : "desc";
    if (orderFilter === "likes") {
      return list.sort(orderByLikes(order));
    }
    if (orderFilter === "name") {
      return list.sort(orderByName(order));
    }
    if (orderFilter === "price-desc") {
      return list.sort(orderByPrice("desc"));
    }
    if (orderFilter === "price-asc") {
      return list.sort(orderByPrice("asc"));
    }
    return list.sort(orderByGrade("desc"));
  }, [data, direction, orderFilter]);

  const paramCategory =
    location.state === null
      ? "all"
      : location.state["category"].toString().trim();

  useEffect(() => {
    loadWatchListCase(paramCategory);

    setPage(1);

    return;
  }, [isLoading, paramCategory]);

  const loadWatchListCase = async (param) => {
    const getData = await loadWatchesCategory({
      warranty: 2,
      selling: 0,
      category: param,
    });
    console.log(getData.data);
    setData(getData.data);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.menu}>
          <select
            className={classes.option}
            name="watch-select"
            id="filter"
            onChange={handleChange}
            value={orderFilter}
          >
            <option value="">정렬</option>
            <option value="likes">인기순</option>
            <option value="grade">등급순</option>
            <option value="price-desc">고가순</option>
            <option value="price-asc">저가순</option>
          </select>
        </div>
        <div className={classes.container}>
          {sortedData.slice(offset, offset + limit).map((watch, index) => {
            const url = "/detail/" + watch.watch_id;
            return (
              <NavLink
                to={url}
                state={{ watch_id: watch.watch_id }}
                key={index}
              >
                <div>
                  <img
                    src={process.env.REACT_APP_IMG_URL + watch.img_urls[0]}
                    alt=""
                  />
                  <ul>
                    <li className={classes.name}>{watch.name}</li>
                    <li className={classes.grade}>{watch.grade}</li>
                    <li className={classes.price}>
                      {"₩" + priceConverter(watch.price)}
                    </li>
                  </ul>
                </div>
              </NavLink>
            );
          })}
        </div>

        {data.length !== 0 ? (
          <div className={classes.pagenation}>
            <Pagination
              total={data.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        ) : (
          <p style={{ marginLeft: "20px" }}>
            항목에 해당하는 상품이 존재하지 않습니다.
          </p>
        )}
      </div>
    </>
  );
};
export default Home;
