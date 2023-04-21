import { request } from "../common";

// 찜목록 가져오기
export const loadPick = (param) => {
  // console.log("param : " + param);
  return request({
    method: "GET",
    url: "/pick/" + param,
    param,
  });
};

// 찜목록 추가하기
export const addPick = (param) => {
  return request({
    method: "POST",
    url: "/pick/" + param.watch_id,
    data: {
      member_id: Number(param.member_id),
      watch_id: param.watch_id,
    },
  });
};

// 찜목록 삭제하기
export const deletePick = (param) => {
  return request({
    method: "DELETE",
    url: "/pick/" + param.watch_id,
    data: {
      member_id: Number(param.member_id),
      watch_id: param.watch_id,
    },
  });
};

//찜목록 확인
export const checkPick = (param) => {
  return request({
    method: "POST",
    url: "/pick/check/" + param.watch_id,
    data: {
      member_id: Number(param.member_id),
      watch_id: param.watch_id,
    },
  });
};
