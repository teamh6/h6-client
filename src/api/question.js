import { request } from "../common";

// 전체 질문 조회
export const loadAllQuestion = (param) => {
  return request({
    method: "GET",
    url: "/question/",
    param,
  });
};
// 내 질문 조회
export const loadMyQuestion = (param) => {
  return request({
    method: "GET",
    url: "/question/my/" + param,
    param,
  });
};

// 답변이 완료된 질문 조회 - 회원
export const loadMyAnswerList = (param) => {
  return request({
    method: "GET",
    url: "/question/my/answer/" + param,
    param,
  });
};

// 답변이 완료되지 않은 질문 조회 - 회원
export const loadMyNoneList = (param) => {
  return request({
    method: "GET",
    url: "/question/none/" + param,
    param,
  });
};
// 답변이 완료되지 않은 질문 조회 - 관리자
export const loadNoneList = (param) => {
  return request({
    method: "GET",
    url: "/question/none",
    param,
  });
};

//^ 답변이 완료된 질문 조회 - 관리자
export const loadAnswerList = (param) => {
  return request({
    method: "GET",
    url: "/question/answer",
    param,
  });
};

// 각 질문 조회 - 관리자 ->
export const loadQuestion = (param) => {
  return request({
    method: "GET",
    url: "/question/" + param,
    param,
  });
};

// 질문 등록
export const addQuestion = (param) => {
  // console.log("param : ", param);
  return request({
    method: "POST",
    url: "/question/my/" + param.member_id,
    data: {
      member_id: param.member_id,
      title: param.title,
      content: param.content,
    },
  });
};

// 질문 수정
export const fix = (param) => {
  return request({
    method: "PUT",
    url: "/question/" + param,
    param,
  });
};

// 수정 페이지 이동(내용 가지고옴 )
export const fixpage = (param) => {
  return request({
    method: "GET",
    url: "/question/" + param + "/fix",
    param,
  });
};

// 답변
export const answer = (param) => {
  // console.log("answer : " + param.answer);
  return request({
    method: "PUT",
    url: "/question/answer/" + param.question_id,
    data: {
      question_id: param.question_id,
      member_id: param.member_id,
      title: param.title,
      content: param.content,
      question_date: param.question_date,
      answer: param.answer,
    },
  });
};

// 삭제
export const deleteQuestion = (param) => {
  return request({
    method: "DELETE",
    url: "/question/" + param,
    param,
  });
};

// 답변이 완료 or 되지않은 질문 수 조회 - 회원
export const loadMyToggleCount = (param) => {
  return request({
    method: "POST",
    url: "/question/my/count/" + param.member_id,
    data: {
      member_id: Number(param.member_id),
      answer: param.answer,
    },
  });
};

// 답변이 완료 or 되지않은 질문 수 조회 - 관리자
export const loadToggleCount = (param) => {
  // console.log("param : " + param);
  return request({
    method: "GET",
    url: "/question/count/" + param,
    param,
  });
};
