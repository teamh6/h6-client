import { request } from "../common";

// 장바구니 가져오기
export const loadBasket = (data) => {
  return request({
    method: "GET",
    url: "/basket/" + data,
    data,
  });
};

// 장바구니 추가
export const addBasket = (data) => {
  return request({
    method: "POST",
    url: "/basket/" + data.watch_id,
    data,
  });
};

// 장바구니 삭제
export const deleteBasket = (data) => {
  return request({
    method: "DELETE",
    url: "/basket/" + data.watch_id,
    data,
  });
};

// 장바구니 중복체크
export const checkBasket = (param) => {
  return request({
    method: "POST",
    url: "/basket/check/" + param.watch_id,
    data: {
      member_id: Number(param.member_id),
      watch_id: param.watch_id,
    },
  });
};
