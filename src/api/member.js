import { request } from "../common";

export const signUp = (param) => {
  // console.log("param : ", param);
  return request({
    method: "POST",
    url: "/member/signup",
    data: {
      email: param.email,
      password: param.password,
      name: param.name,
      phone_number: param.phone_number,
    },
  });
};

export const login = (param) => {
  return request({
    method: "POST",
    url: "/member/login",
    param,
  });
};
