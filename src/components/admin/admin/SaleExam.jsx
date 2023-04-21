import React, { useEffect, useState } from "react";
import classes from "./SaleExam.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { loadWatch, updateWatch } from "../../../api/watches";
import { priceConverter } from "../../../common/utils";
export const SaleExam = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const watchId = location.state["watch_id"];
  //관리자가 측정할 등급
  const [examGrade, setExamGrade] = useState("BRONZE");
  const navigate = useNavigate();
  const onLoadWatch = async (watchId) => {
    try {
      const getData = await loadWatch(watchId);
      // console.log(getData.data);
      setData(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };
  const handleGrade = (e) => {
    setExamGrade(e.target.value);
  };
  const examWatch = async (param) => {
    // param :  승인완료 -> 2, 거절 -> -1
    try {
      const getData = await updateWatch({
        watch_id: watchId,
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category,
        grade: examGrade,
        warranty: param,
      });
      if (param === 2) {
        getData.data === 1 ? alert("승인완료 되었습니다.") : alert("오류!");
        navigate("/admin/saleapplist");
        return;
      }
      if (param === -1) {
        getData.data === 1 ? alert("판매거절 되었습니다.") : alert("오류!");
        navigate("/admin/saleapplist");
        return;
      }
    } catch (e) {}
  };
  useEffect(() => {
    onLoadWatch(watchId);
  }, [isLoading]);
  return (
    <>
      {isLoading && (
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.img}>
              <img
                src={process.env.REACT_APP_IMG_URL + data.img_urls[0]}
                alt=""
              />
            </div>

            <div className={classes.infoArea}>
              <div className={classes.name}>
                <h2>{data.name}</h2>
              </div>

              <div className={classes.detail}>
                <h3>
                  신청일
                  <div>{data.register_date}</div>
                </h3>
                <h3>
                  회원 요청가
                  <div>{priceConverter(data.price)}원</div>
                </h3>
                <h3>
                  카테고리
                  <div>{data.category}</div>
                </h3>
                <h3>
                  책정등급
                  <div className={classes.grade}>
                    <select name="" id="grade" onChange={handleGrade}>
                      <option value="BRONZE">BRONZE</option>
                      <option value="SILVER">SILVER</option>
                      <option value="GOLD">GOLD</option>
                      <option value="PLATINUM">PLATINUM</option>
                      <option value="DIAMOND">DIAMOND</option>
                    </select>
                  </div>
                </h3>
              </div>

              <div className={classes.button}>
                <ul>
                  <li className={classes.app}>
                    <button onClick={() => examWatch(2)}>승인완료</button>
                  </li>
                  <li className={classes.refuse}>
                    <button onClick={() => examWatch(-1)}>판매거절</button>
                  </li>
                </ul>
              </div>
              <div className={classes.info}>
                <h3>상품설명</h3>
                <div>{data.description}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SaleExam;
