import React, { useContext, useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../../../api/question";
import { MemberContext } from "../../../context";

import classes from "./QuestionApp.module.css";

//문의사항 등록
const QuestionApp = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [result, setResult] = useState(-1);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const memberId = useContext(MemberContext);
  // console.log(memberId);
  const onSubmit = handleSubmit(async (input) => {
    // console.log("input : ", input);
    try {
      const getData = await addQuestion({
        member_id: Number(memberId),
        title: input.title,
        content: input.content,
      });
      // console.log(getData.data);
      if (getData.data === 1) {
        alert("질문이 등록되었습니다.");
        navigate("/mypage/question");
        return;
      }
    } catch (e) {}
  });
  return (
    <div className={classes.root}>
      <h3>문의 사항</h3>
      <form onSubmit={onSubmit}>
        <div style={{ paddingBottom: "15px" }}>
          <label htmlFor="title">문의 제목</label>
          <input
            type="text"
            id="title"
            placeholder=""
            maxLength={40}
            {...register("title", {
              required: "필수 입력사항입니다.",
            })}
          />
        </div>

        <div style={{ paddingBottom: "15px" }}>
          <label htmlFor="content">문의 사항</label>
          <textarea
            type="text"
            id="content"
            placeholder=""
            maxLength={300}
            {...register("content", {
              required: "필수 입력사항입니다.",
            })}
          ></textarea>
        </div>
        <button className={classes.button} type="submit">
          <div>문의사항 접수</div>
        </button>
      </form>
    </div>
  );
};
export default QuestionApp;
