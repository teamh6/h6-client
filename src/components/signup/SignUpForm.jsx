import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp, sinUp } from "../../api/member";
import classes from "./SignUpForm.module.css";

const SignUpForm = () => {
  //이메일 중복체크 성공 -> 1, 실패 -> -1, 중복체크 안하고 가입하기 -> -99
  const [result, setResult] = useState(0);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //^ 회원 가입 후 메인 페이지로 이동
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (input) => {
    // console.log("input : ", input);
    // 이메일 중복 체크를 하고 회원가입 시도 했을 시
    if (result !== -99) {
      // 아이디 중복체크 성공 시
      if (result === 1) {
        const getData = await signUp(input);
        // console.log(getData.data);
        if (getData.data === 1) {
          alert("회원가입이 완료되었습니다. 다시 로그인 해주세요.");
          navigate("/");
          return;
        }
        alert("회원 가입에 실패 하였습니다. 다시 시도해주세요.");
        return;
      }
      setResult(-99);
      return;
    }
  });

  //^ 아이디 중복 체크 눌렀을 시 처리
  const onIdCheck = () => {
    onLoadId();
  };

  //^ 비동기화로 아이디 중복체크
  const onLoadId = async () => {
    try {
      const getData = await axios.request({
        method: "GET",
        url: process.env.REACT_APP_BASE_URL + "/member/signup/" + watch("email").toString(),
      });

      // 중복 체크 성공
      if (getData.data === 1) {
        setResult(getData.data);
        return;
      }

      //중복체크 실패
      setResult(-1);
    } catch (e) {
      console.log("오류");
    }
  };
  // console.log("result : ", result);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <h2>회원가입</h2>

          <div className={classes.signupform}>
            <form onSubmit={onSubmit}>
              <h3>
                <label htmlFor="email">이메일</label>
                <button className={classes.check} onClick={onIdCheck}>
                  &#42; 이메일 중복 체크
                </button>
              </h3>

              <input
                type="text"
                id="email"
                placeholder="ex) abcdef@example.com"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  // 앞에 특수기호 x  나머지는 0 부터
                  pattern:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                })}
                onChange={() => {
                  setResult(0);
                }}
              />

              {errors.email && <p>올바른 형식으로 이메일을 입력해주세요.</p>}
              {result === 1 && <p style={{ color: "blue" }}>사용가능한 이메일 입니다.</p>}
              {result === -1 && <p style={{ color: "red" }}>중복된 이메일 입니다.</p>}

              <h3>
                <label htmlFor="password">비밀번호</label>
              </h3>
              <input
                type="password"
                id="password"
                placeholder="영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$$/,
                })}
              />
              {errors.password && <p>비밀번호 형식에 맞지 않습니다.</p>}

              <h3>
                <label htmlFor="password_confirm">비밀번호 확인</label>
              </h3>
              <input
                type="password"
                id="password_confirm"
                placeholder="비밀번호를 한번 더 입력해주세요."
                {...register("password_confirm", {
                  required: "필수 입력사항입니다.",
                  validate: {
                    matchesPreviousPassword: (value) => {
                      // console.log("value : ", value);
                      //^  const { password } = getValue(); -> watch
                      const { password } = watch();
                      return password === value || "비밀번호가 일치하지 않습니다.";
                    },
                  },
                })}
              />
              {errors.password_confirm && errors.password_confirm.type === "validate" && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}

              <h3>
                <label htmlFor="name">이름</label>
              </h3>
              <input
                type="text"
                id="name"
                placeholder="ex) 홍길동"
                {...register("name", {
                  required: "이름을 입력해주세요.",
                  pattern: /^[가-힣]{2,7}$/,
                })}
              />
              {errors.name && errors.name.type === "required" && <p>이름을 입력해주세요.</p>}
              {errors.name && errors.name.type === "pattern" && (
                <p>이름 형식에 맞지 않습니다. 한글로 올바르게 이름을 입력해주세요.</p>
              )}

              <h3>
                <label htmlFor="phone_number">휴대폰 번호</label>
              </h3>
              <input
                type="text"
                id="phone_number"
                placeholder="ex) 01012345678"
                {...register("phone_number", {
                  required: "휴대폰번호를 입력해주세요",
                  pattern: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g,
                })}
              />
              {errors.phone_number && <p>숫자만 입력하세요.</p>}

              <button className={classes.button} type="submit">
                <div>가입하기</div>
              </button>

              {result === -99 && <p style={{ color: "red" }}>이메일 중복 체크를 해주세요.</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
