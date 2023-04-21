import React from "react";
import classes from "./FAQ.module.css";

export default function Notice() {
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          <h3>자주묻는질문</h3>
          <ul className={classes.list}>
            <li>
              <div>
                <p>
                  {" "}
                  <b> 이용정책</b>&nbsp;검수 및 품질 보증 관련 주의사항
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  {" "}
                  <b> 공지</b>&nbsp;보이스 피싱 피해 주의 당부
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  {" "}
                  <b> 구매</b>&nbsp;상품 구매는 어떻게 하나요?
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  {" "}
                  <b> 판매</b>&nbsp;판매 후 입고 처리 과정이 궁금해요.
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  {" "}
                  <b> 공통</b>&nbsp;HOWWATCH는 어떤 서비스인가요?
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
