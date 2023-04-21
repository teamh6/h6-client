import React from "react";
import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <ul className={classes.navigation}>
          <Link to="/about">
            <li>회사소개</li>
            {/* 원래 li 밖에다 Link를 빼는가? */}
          </Link>
          <Link to="/information">
            <li>쇼핑몰이용안내</li>
          </Link>
          <Link to="/provision/service">
            <li>이용약관</li>
          </Link>
          <Link to="/provision/policy">
            <li>개인정보취급방침</li>
          </Link>
        </ul>
        <div className={classes.information}>
          <div>
            <h4>CUSTOMER CENTER</h4>
            <p className={classes["phone"]}> 02-1234-1234</p>
            <ul className={classes["cs-time"]}>
              <li>
                <span>평 일:</span>
                <span>오전 11:00 ~ 오후 06:30 (6시00분 마감)</span>
              </li>
              <li>
                <span>토요일:</span>
                <span>오전 11:00 ~ 오후 05:30 (5시00분 마감)</span>
              </li>
              <li>
                <span>일요일:</span>
                <span>오전 11:00 ~ 오후 05:30 (5시00분 마감)</span>
              </li>
            </ul>
          </div>
          <div>
            <h4>COMPANY INFO</h4>
            <ul>
              <li>
                <span>회사명</span>
                <span>HOWWATCH</span>
              </li>
              <li>
                <span>대표</span>
                <span>이정화</span>
              </li>
              <li>
                <span>대표전화</span>
                <span>02-3434-3434</span>
              </li>
              <li>
                <span>팩스</span>
                <span>02-8787-9898</span>
              </li>
              <li>
                <span>주소</span>
                <span>
                  (153-759) 서울시 금천구 가산동 426-5 월드메르디앙 2차 413호
                </span>
              </li>
              <li>
                <span>사업자 등록번호</span>
                <span>100-10-10000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
