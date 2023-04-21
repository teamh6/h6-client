import { request } from "../common";

//전체 시계 리스트
export const loadWatches = (param) => {
  return request({
    method: "GET",
    url: "/watches/",
    param,
  });
};

//회원이 등록한 모든 시계 리스트 수
export const countMyWatches = (param) => {
  return request({
    method: "GET",
    url: "/watches/apply/count/" + param,
    param,
  });
};

//^ case
// 판매중 : warranty = 2 and selling = 0
// 판매완료 : warranty = 2 and selling = 1
// 검증중 : warranty = 1 and selling = 0
// 판매불가 : warranty = - 1 and selling = 0
//case 에 따른 시계 리스트 -> 관리자
export const loadWatchesCase = (param) => {
  return request({
    method: "POST",
    url: "/watches/case",
    data: {
      warranty: param.warranty,
      selling: param.selling,
      category: "all",
    },
  });
};
// case에 따른 시계 리스트 -> 회원
export const loadWatchesCaseMember = (param) => {
  // console.log(param);
  return request({
    method: "POST",
    url: "/watches/case/" + param.member_id,
    data: {
      member_id: Number(param.member_id),
      warranty: param.warranty,
      selling: param.selling,
    },
  });
};
//category에 따른 시계 리스트
export const loadWatchesCategory = (param) => {
  return request({
    method: "POST",
    url: "/watches/category",
    data: {
      warranty: param.warranty,
      selling: param.selling,
      category: param.category,
    },
  });
};
//시계 정보 조회
export const loadWatch = (param) => {
  // console.log("loadWatch : ", param);
  return request({
    method: "GET",
    url: "/watches/" + param,
    param,
  });
};
// 나의 판매요청 리스트 조회
export const loadApplyWatches = (param) => {
  // console.log("param : ", param);
  return request({
    method: "GET",
    url: "/watches/apply/" + param,
    param,
  });
};

//시계 추가
export const addWatch = (data) => {
  //임시배열
  let imageArray = [];
  //FileList를 배열로 만들어서 이미지 주소값을 넣어줌.
  for (let idx in Array.from(data.images)) {
    imageArray[idx] = Array.from(data.images)[idx].name;
  }

  return request({
    method: "POST",
    url: "/watches",
    data: {
      member_id: Number(sessionStorage.getItem("member_id")),
      name: data.name,
      price: Number(data.price),
      description: data.description,
      category: data.category,
      img_urls: imageArray,
    },
  });
};

//시계 삭제 -> url param 변경 해야함.
//테스트 완료
export const deleteWatch = (param) => {
  return request({
    method: "DELETE",
    url: "/watches/" + param,
    param,
  });
};

//시계정보 업데이트
export const updateWatch = (param) => {
  return request({
    method: "PUT",
    url: "/watches/" + param.watch_id,
    data: param,
  });
};

//시계 이미지 등록 함수
export const addWatchImage = (data) => {
  return request({
    method: "POST",
    url: "/watches/" + data,
    data,
  });
};

// 상황에 따른 시계 수 가져오기 - 회원
export const countCaseMember = (param) => {
  return request({
    method: "POST",
    url: "/watches/case/count/" + param.member_id,
    data: {
      member_id: param.member_id,
      warranty: param.warranty,
      selling: param.selling,
    },
  });
};
// 상황에 따른 시계 수 가져오기 관리자
export const countCase = (param) => {
  return request({
    method: "POST",
    url: "/watches/case/count",
    data: {
      warranty: param.warranty,
      selling: param.selling,
      category: "all",
    },
  });
};

// 모든 시계 수 가져오기  - 관리자
export const countWatches = (param) => {
  return request({
    method: "GET",
    url: "/watches/count",
    param,
  });
};
