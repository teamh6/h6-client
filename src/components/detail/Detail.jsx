import React, { useContext, useEffect, useState } from "react";
import classes from "./Detail.module.css";
import redheart from "../../resources/images/빨간하트.png";
import blackheart from "../../resources/images/검정하트.png";
import { useLocation, useNavigate } from "react-router-dom";
// import { tempData } from "../buy/temp";
import { loadWatch } from "../../api/watches";
import { addPick, checkPick, deletePick } from "../../api/pick";
import { MemberContext } from "../../context/RootContextProvider";
import { addBasket, checkBasket } from "../../api/basket";
import { priceConverter } from "../../common/utils";
import { addPurchase } from "../../api/purchase";
export const Detail = () => {
  const [watchData, setWatchData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [hasPick, setHasPick] = useState(0);
  const [hasBasket, setHasBasket] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const memberId = useContext(MemberContext);

  const navigate = useNavigate();
  //장바구니 중복체크 -> hasBasekt이 1이면 중복, 0이면 중복x (pick도 마찬가지)
  const basketCheck = async () => {
    try {
      const getData = await checkBasket({
        member_id: memberId,
        watch_id: location.state["watch_id"],
      });
      setHasBasket(getData.data);
    } catch (e) {}
  };

  //^ location : MainPage의 Link에서 던져준 props를 확인하기 위해
  //찜 목록 중복체크
  const pickCheck = async () => {
    try {
      const getData = await checkPick({
        member_id: sessionStorage.getItem("member_id"),
        watch_id: location.state["watch_id"],
      });
      setHasPick(getData.data);
    } catch (e) {}
  };

  //좋아요
  const onLike = async () => {
    if (sessionStorage.getItem("member_id") !== null && hasPick === 0) {
      try {
        const getData = await addPick({
          member_id: sessionStorage.getItem("member_id"),
          watch_id: location.state["watch_id"],
        });
        setHasPick(getData.data);
        setIsLoading(false);
        return;
      } catch (e) {}
    }
    if (sessionStorage.getItem("member_id") !== null && hasPick === 1) {
      try {
        const getData = await deletePick({
          member_id: sessionStorage.getItem("member_id"),
          watch_id: location.state["watch_id"],
        });
        setHasPick(getData.data);
        setIsLoading(false);
        return;
      } catch (e) {}
    }
    alert("로그인 후 가능합니다.");
  };
  const onBasket = async () => {
    if (memberId !== -1 && hasBasket === 0) {
      try {
        const getData = await addBasket({
          member_id: memberId,
          watch_id: location.state["watch_id"],
        });
        setHasBasket(getData.data);
        setIsLoading(false);
        alert("장바구니에 추가되었습니다.");
        return;
      } catch (e) {}
    }
    if (memberId !== -1 && hasBasket === 1) {
      alert("이미 추가된 상품입니다.");
      return;
    }
    alert("로그인 후 가능합니다.");
  };
  //구매하기
  const onPurchase = async () => {
    if (memberId !== -1) {
      try {
        const getData = await addPurchase({
          member_id: memberId,
          watch_id: location.state["watch_id"],
        });
        if (getData.data === 1) {
          setIsLoading(false);
          alert("구매 완료 되었습니다.");
          navigate("/mypage/buy");
        }
      } catch (e) {}
    }
  };
  //시계 정보 가져오기
  const onLoad = async () => {
    try {
      const getData = await loadWatch(location.state["watch_id"]);
      setWatchData(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };
  useEffect(() => {
    //로그인이 되어있을 때 찜console.log(); 확인
    // console.log("memberId : ", memberId);
    // console.log("hasBasket : ", hasBasket);
    // console.log("hasPick : ", hasPick);
    if (sessionStorage.getItem("member_id") !== null) {
      pickCheck();
      basketCheck();
    }
    if (sessionStorage.getItem("admin") === "1") {
      setIsAdmin(true);
    }
    onLoad();
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className={classes.root}>
          <div className={classes.container}>
            <div className={classes.img}>
              <img src={process.env.REACT_APP_IMG_URL + watchData.img_urls[0]} alt="" />
            </div>

            <div className={classes.infoArea}>
              <div className={classes.name}>
                <h2>{watchData.name}</h2>
              </div>

              <div className={classes.detail}>
                <h3>
                  가격 <div>{priceConverter(watchData.price)}원</div>
                </h3>

                <h3>
                  등급 <div>{watchData.grade}</div>
                </h3>
                <h3>
                  등록일
                  <div>{watchData.register_date}</div>
                </h3>
              </div>

              <div className={classes.button}>
                {!isAdmin && (
                  <ul>
                    <li className={classes.basket}>
                      <button onClick={onBasket}>장바구니</button>
                    </li>
                    <li className={classes.buy}>
                      <button
                        onClick={() => {
                          if (window.confirm("구매 하시겠습니까?")) {
                            onPurchase();
                          } else {
                            alert("구매 취소되었습니다.");
                          }
                        }}
                      >
                        바로구매
                      </button>
                    </li>
                  </ul>
                )}
                <div className={classes.wish}>
                  {isAdmin ? (
                    //관리자 일때
                    <button>
                      <img src={redheart} alt="" />
                      &nbsp; {watchData.likes}
                    </button>
                  ) : (
                    //관리자 아닐 때
                    <button onClick={onLike}>
                      <img src={hasPick === 0 ? blackheart : redheart} alt="" />
                      &nbsp; {watchData.likes}
                    </button>
                  )}
                </div>
              </div>
              <div className={classes.info}>
                <h3>상품 정보</h3>
                <div>
                  {/* 크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은
                  개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은 각
                  판매자에게 있습니다. 단, 이용약관 및 정책, 기타 거래 체결 과정에서 고지하는 내용
                  등에 따라 검수하고 보증하는 내용에 대한 책임은 크림(주)에 있습니다. */}
                  {watchData.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
