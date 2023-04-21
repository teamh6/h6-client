import React from "react";
import classes from "./Notice.module.css";

export default function Notice() {
 
  return (
    <>
    <div className={classes.root}>
      <div className={classes.title}>    
          <h3>공지사항</h3>  
          <ul className={classes.list}>
            <li><div><p>&#91;공지&#93;&nbsp;검수 기준 변경 안내&nbsp;(2.28 화요일 체결 거래부터)</p></div></li>
            <li><div><p>&#91;공지&#93;&nbsp;보이스 피싱 피해 주의 당부</p></div></li>
            <li><div><p>&#91;이벤트 종료&#93;&nbsp;3월 네이버페이 프로모션</p></div></li>
            <li><div><p>&#91;이벤트 발표&#93;&nbsp;밸런타인 디저트 응모 당첨자 발표 안내</p></div></li>
            <li><div><p>&#91;공지&#93;&nbsp;서비스 수수료 안내</p></div></li>
          </ul> 
      </div>

    </div>
    </>
  );
}
