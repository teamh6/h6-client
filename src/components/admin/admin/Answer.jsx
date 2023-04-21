import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { answer, loadQuestion } from "../../../api/question";
import classes from "./Answer.module.css";

function Answer() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const questionId = location.state["question_id"];
  const navigate = useNavigate();
  const { register, control, handleSubmit } = useForm();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  const onLoadQuestion = async (param) => {
    try {
      const getData = await loadQuestion(param);
      // console.log(getData.data);
      setData(getData.data);
      // console.log(getData.data.answer);
      // console.log(getData.answer == null);
      if (getData.data.answer != null) {
        setHasAnswer(true);
      }
      setIsLoading(true);
    } catch (e) {}
  };
  // const admin = sessionStorage.getItem("admin");

  const onSubmit = handleSubmit(async (input) => {
    console.log("input : " + input);
    try {
      const getData = await answer({
        question_id: questionId,
        member_id: data.member_id,
        title: data.title,
        content: data.content,
        question_date: data.question_date,
        answer: input.answer,
      });
      if (getData.data === 1 && isAdmin === false) {
        alert("질문이 등록되었습니다.");
        navigate(-1);
        return;
      }
      if (hasAnswer === true && isAdmin === true) {
        alert("답변이 수정되었습니다.");
        navigate(-1);
        return;
      }
      if (hasAnswer !== true && isAdmin === true) {
        alert("답변이 등록되었습니다.");
        navigate(-1);
        return;
      }
      alert("질문이 등록되지 않았습니다.");
    } catch (e) {}
  });
  useEffect(() => {
    if (sessionStorage.getItem("admin") === "1") {
      setIsAdmin(true);
    }

    onLoadQuestion(questionId);
  }, [isLoading]);
  return (
    <div className={classes.root}>
      <h3>회원님의 문의 사항</h3>

      <div style={{ paddingBottom: "15px" }}>
        <label htmlFor="title">문의 제목</label>
        <p>{data.title}</p>
      </div>

      <div style={{ paddingBottom: "15px" }}>
        <label htmlFor="content">문의 사항</label>
        <p>{data.content}</p>
      </div>
      {isAdmin && (
        <>
          {" "}
          <h3>관리자 답변</h3>
          <form onSubmit={onSubmit}>
            <div style={{ paddingBottom: "15px" }}>
              <label htmlFor="answer">답변</label>
              {isLoading && (
                <textarea
                  type="text"
                  id="answer"
                  placeholder=""
                  maxLength={300}
                  {...register("answer")}
                  defaultValue={hasAnswer === true ? data.answer : " "}
                ></textarea>
              )}
            </div>

            <button className={classes.button} type="submit">
              {hasAnswer === true ? "답변수정" : "답변제출"}
            </button>
          </form>
        </>
      )}
      {!isAdmin && (
        <>
          {hasAnswer && (
            <div style={{ paddingBottom: "15px" }}>
              <label htmlFor="answer">답변</label>
              {isLoading && (
                <p type="text" id="answer">
                  {hasAnswer === true ? data.answer : " "}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Answer;
