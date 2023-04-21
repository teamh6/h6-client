import React, { useContext, useEffect, useState } from "react";
import classes from "./QuestionList.module.css";

// 날짜 관련 함수 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import Pagination from "../Pagination";
import { MemberContext } from "../../../context";
import { NavLink } from "react-router-dom";
import {
  deleteQuestion,
  loadMyAnswerList,
  loadMyNoneList,
  loadMyQuestion,
  loadMyToggleCount,
} from "../../../api/question";

const QuestionList = () => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [startDate, setStartDate] = useState(new Date("2022-02-10"));
  const [endDate, setEndDate] = useState(new Date());
  const [direction, setDirection] = useState(1);
  const [orderFilter, setOrderFilter] = useState("question_date");
  const [allCount, setAllCount] = useState(0);
  const [noAnswerCount, setNoAnswerCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [checkItems, setCheckItems] = useState([]);

  //상단 페이지 내용 배열
  let updata = ["전체", "대기중", "답변완료"];

  let [btnActive, setbtnActive] = useState(0);
  const memberId = useContext(MemberContext);
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
      data.forEach((el) => idArray.push(el.question_id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const toggleActive = (e) => {
    console.log("btnActive: ", btnActive);
  };

  // 삭제
  const onRemove = async (questionId) => {
    //   console.log("watchId : ", watchId);
    try {
      const getData = await deleteQuestion(questionId);
      // console.log(getData.data + "행 삭제됨.");
      setIsLoading(false);
    } catch (e) {}
  };

  //선택삭제
  const onSelectRemove = (param) => {
    for (let idx in param) {
      // console.log("watchId : ", param[idx]);
      onRemove(param[idx]);
    }
    setIsLoading(false);
  };
  // 내 질문 조회
  const onLoadMyQuestion = async (param) => {
    if (param === 0) {
      try {
        const getData = await loadMyQuestion(memberId);
        // console.log(getData.data);
        setData(getData.data);
        setAllCount(getData.data.length);
        setIsLoading(true);
      } catch (e) {}
    }
    if (param === 1) {
      try {
        const getData = await loadMyNoneList(memberId);
        // console.log(getData.data);
        setData(getData.data);

        setIsLoading(true);
      } catch (e) {}
    }
    if (param === 2) {
      try {
        const getData = await loadMyAnswerList(memberId);
        setData(getData.data);

        setIsLoading(true);
      } catch (e) {}
    }
  };

  const loadQuestionCount = async (param) => {
    // 답변 완료x
    if (param === 1) {
      try {
        const getData = await loadMyToggleCount({
          member_id: memberId,
          answer: 0,
        });
        setNoAnswerCount(getData.data);
      } catch (e) {}
    }
    // 답변 완료
    if (param === 2) {
      try {
        const getData = await loadMyToggleCount({
          member_id: memberId,
          answer: 1,
        });
        setAnswerCount(getData.data);
      } catch (e) {}
    }
  };
  useEffect(() => {
    if (btnActive === 0) {
      onLoadMyQuestion(0);
      loadQuestionCount(1);
      loadQuestionCount(2);
    }
    if (btnActive === 1) {
      onLoadMyQuestion(1);
    }
    if (btnActive === 2) {
      onLoadMyQuestion(2);
    }
  }, [isLoading]);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.condition}>
          <h3>나의문의사항</h3>
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
                    }}
                  >
                    <span className={classes.length}>
                      {idx === 0 ? allCount : idx === 1 ? noAnswerCount : answerCount}
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
            <button>
              <NavLink to="/mypage/question/app">문의사항 작성하기</NavLink>
            </button>
          </div>
          {/* 오른쪽 상단 버튼 */}
          <div className={classes.righttop}>
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
              onClick={() => onSelectRemove(checkItems)}
            >
              선택 삭제
            </button>
          </div>
        </div>

        {/* 질문리스트 */}
        <div style={{ minHeight: "300px" }}>
          <div className={classes.container}>
            {data
              .filter((question) =>
                new Date(question.question_date) > new Date(startDate)
                  ? true
                  : new Date(question.question_date).getDate() >= startDate.getDate()
                  ? true
                  : false && new Date(question.question_date) <= new Date(endDate)
              )
              .slice(offset, offset + limit)
              .map((question, key) => (
                <div className={classes.list} key={key}>
                  <div htmlFor={`select-${question.question_id}`}>
                    {/* 질문정보 */}
                    <div className={classes.product}>
                      <NavLink
                        to={"/question/" + question.question_id}
                        state={{ question_id: question.question_id }}
                      >
                        <div>
                          <ul>
                            <li className={classes.name}>{question.title}</li>
                          </ul>
                        </div>
                      </NavLink>
                      {/* 등록날짜 */}
                      <div className={classes.applicationdate}>
                        <p>질문 등록일 : {question.question_date}</p>
                      </div>
                      <input
                        style={{ marginRight: "28px" }}
                        type="checkbox"
                        id={`select-${question.question_id}`}
                        name={`select-${question.question_id}`}
                        onChange={(e) => handleSingleCheck(e.target.checked, question.question_id)}
                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                        checked={checkItems.includes(question.question_id) ? true : false}
                      />
                      <div className={classes.application}>
                        <button type="button" onClick={() => onRemove(question.question_id)}>
                          삭제
                        </button>
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
};

export default QuestionList;
