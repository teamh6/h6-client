import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";

//^ javascript라서 input이 어떤 key,value를 가졌는지 모르기 때문에 state를 여러개 놔두는 게 좋다.
//^ => 이게 나은 방법

//^ 이 방식은 console.log를 찍어보고 어떤 값을 다루는지 input태그를 다 확인해야하기때문에 작업속도가 늦어짐.
//^ typescript라면 상관이 없을 수도 있다.
//^ hook이 생기고 나서는 하나하나 state를 쪼개는 게 trend
//! 중요한건 코드의 길이보다 가독성(직관성) 이 중요! -> 상황마다 다르지만 이런 경우는 하나의 오브젝트로 합칠 이유가 크게 없기 때문에
const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (input) => {
    console.log(input);

    // TODO: axios 를 이용해 서버 호출하기
    try {
      const {
        data: { name, admin, member_id },
      } = await login(input);

      // 로그인 성공 케이스
      sessionStorage.setItem("email", input.email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("admin", admin);
      sessionStorage.setItem("member_id", member_id);
      navigate("/", { replace: true });
    } catch (e) {
      // TODO: 로그인 실패 케이스
      console.log(e.response);
    }
  });

  return (
    <>
      {/* 푸터 위치입니다 수정할시 주의! */}
      <div className="relative min-h-[400px] pb-[10px] h-full">
        {/* 계정 로그인 txt 위치입니다 변경시 user.js랑도 바꿔야하니 알려주세요 */}
        <div className="absolute top-[40px] left-[40%] bg-slate-300 rounded-md w-[200px] h-[60px] text-2xl leading-[60px] text-center">
          <h2>계정 로그인</h2>
        </div>
        <div className="absolute top-[140px] left-[40%] text-sm">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">이메일</label>
            </div>
            <input
              className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500"
              id="email"
              placeholder="이메일을 입력 해 주세요"
              {...register("email", { required: "이메일은 필수 입력 사항입니다." })}
            />
            <p>{errors.email?.message}</p>
            <div className="mt-8">
              <label htmlFor="password">비밀번호</label>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="password"
                {...register("password", { required: "패스워드는 필수 입력 사항입니다." })}
                placeholder="비밀번호"
                autoComplete="off"
              />
              <p>{errors.password?.message}</p>
            </div>
            <div className="mt-14">
              <button
                className="mt-1 block w-full px-8 py-1.5 bg-sky-200 border border-slate-300 rounded-md text-[18px] shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="submit"
              >
                로그인
              </button>
            </div>
            <div className="mt-14"></div>
          </form>
          <div className="mt-1">
            <ul className="inline-flex">
              <li>
                <Link className="text-[8px]" href="#">
                  회원가입/{" "}
                </Link>
              </li>
              <li>
                <Link className="text-[8px]" href="#">
                  아이디 찾기/{" "}
                </Link>
              </li>
              <li>
                <Link className="text-[8px]" href="#">
                  비밀번호 찾기
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
