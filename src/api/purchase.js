import { request } from "../common";

// 구매목록 추가
export const addPurchase = (data) => {
  return request({
    method: "POST",
    url: "/purchase/" + data.watch_id,
    data,
  });
};

// 구매목록 가져오기
export const loadList = (data) => {
  return request({
    method: "GET",
    url: "/purchase/list/" + data,
    data,
  });
};
