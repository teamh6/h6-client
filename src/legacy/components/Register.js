import { getValue } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../index.css";
const Register = () => {
  const [result, setResult] = useState(-99);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (input) => {
    console.log(input);
  });

  //^ 아이디 중복 체크 눌렀을 시 처리
  const onIdCheck = (e) => {
    console.log(watch("email"));
    e.preventDefault();
    onLoadId();
  };

  //^ 비동기화로 아이디 중복체크
  const onLoadId = async () => {
    try {
      const getData = await axios.request({
        method: "get",
        url: "http://localhost:9001/api/register/" + watch("email"),
      });

      console.log(getData);
      // setResult(getData.data);

      if (getData.data === 1) {
        setResult(getData.data);
        return;
      }
      console.log(result);

      setResult(-1);
    } catch (e) {}
  };

  return (
    <>
      {/* 헤더라 따로 안 건드립니다 나중에 헤더 추가되면 그 때 할게요 */}
      {/* div 부모로 묶은 테그입니다 !!!건드리면 푸터 이상해져요 */}
      <div className="relative min-h-[600px] pb-[10px] h-full">
        {/* 가운데 회원가입 박스 코드입니다*/}
        <div className="absolute top-[40px] left-[40%] bg-slate-300 rounded-md w-[200px] h-[60px] text-2xl leading-[60px] text-center">
          <h2>회원가입</h2>
        </div>
        <div className="absolute top-[140px] left-[40%] text-sm">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">이메일</label>
              {/* <br /> */}
              <button onClick={onIdCheck} style={{ marginLeft: "100px" }}>
                ▶이메일 중복 체크
              </button>
              <input
                className="input-primary"
                type="text"
                id="email"
                placeholder="ex) abcdef@example.com"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  // 앞에 특수기호 x  나머지는 0 부터
                  pattern:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                })}
              />

              {errors.email && <p>올바른 형식으로 이메일을 입력해주세요.</p>}
              {result === 1 && <p>사용가능한 이메일 입니다.</p>}
              {result === -1 && <p>중복된 이메일 입니다.</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="password">비밀번호</label>
              <input
                className="input-primary"
                type="password"
                id="password"
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern:
                    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p>영문+숫자+특수기호 8 ~ 16 자리로 해주세요.</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password_confirm">비밀번호 확인</label>
              <input
                className="input-primary"
                type="password"
                id="password_confirm"
                placeholder="비밀번호를 입력해주세요"
                {...register("password_confirm", {
                  required: "필수입력사항입니다.",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValue();
                      return password === value || "비밀번호가 일치하지 않습니다";
                    },
                  },
                })}
              />
              {errors.password_confirm && errors.password_confirm.type === "validate" && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="name">이름</label>
              <input
                className="input-primary"
                type="text"
                id="name"
                placeholder="ex)홍길동"
                {...register("name", {
                  required: "이름을 입력해주세요",
                  pattern: /^[가-힣]{2,7}$/,
                })}
              />
              {errors.name && errors.name.type === "required" && <p>이름을 입력해주세요.</p>}
              {errors.name && errors.name.type === "pattern" && (
                <p>이름 형식에 맞지 않습니다. 한글로 올바르게 이름을 입력해주세요.</p>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="phone_number">휴대전화</label>
              <input
                className="input-primary"
                type="text"
                id="phone_number"
                placeholder="ex) 01012345678"
                {...register("phone_number", {
                  required: "휴대폰번호를 입력해주세요",
                  pattern: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g,
                })}
              />
              {errors.phone_number && <p>연락처는숫자만 입력하세요</p>}
            </div>

            <div className="mt-8">
              <button
                className="mt-1 block w-full px-8 py-1.5 bg-sky-200 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="submit"
              >
                가입하기
              </button>
              <button className="btn-blue">안녕</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
