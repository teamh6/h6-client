import { request } from "../common";

/**
 * 1. 다건 조회
 *   - GET (불변)
 *   - 조건은 쿼리로 처리 합시다. (변하는 정보)
 *   - url: 변하는 정보
 * 2. 단건 조회
 *   - GET
 *   - path variable 형태로 id 전달
 * 3. 업데이트, 생성
 *   - POST
 *   - 데이터는 request body content-type json
 * 4. 삭제
 *   - Delete
 *   - path variable 형태로 id 전달
 */

export const fetchWatches = (param) =>
  request({
    method: "POST",
    url: "/api/watch",
    param,
  });

export const login = (data) =>
  request({
    method: "POST",
    url: "/member/login",
    data,
  });
