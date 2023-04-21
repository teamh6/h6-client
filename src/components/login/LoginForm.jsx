import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { MemberContext, SetMemberContext } from "../../context";
import classes from "./LoginForm.module.css";
// typescript를 쓸 때는 ts가 자동으로 붙기 때문에
// jsx를 쓰기 위해서 .jsx 확장자를 쓰는게 좋다. -> ts의 경우 .tsx
const LoginForm = () => {
  const [fail, setFail] = useState(false);
  const memberId = useContext(MemberContext);
  const setMemberId = useContext(SetMemberContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (input) => {
    // TODO: axios 를 이용해 서버 호출하기
    try {
      //^ server에서 내려준 data
      const {
        data: { name, admin, member_id },
      } = await login(input);

      if (member_id === -1) {
        // alert("존재하지 않는 회원 입니다.");
        setFail(true);
        return;
      }
      // 로그인 성공 케이스
      sessionStorage.setItem("email", input.email);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("admin", admin);
      sessionStorage.setItem("member_id", member_id);
      setMemberId(Number(sessionStorage.getItem("member_id")));
      // window.location.href = "/";
      // console.log("memberId:" + memberId);
      navigate("/", { replace: true });
    } catch (e) {
      // TODO: 로그인 실패 케이스
      console.log("오류 : " + e);
      console.log("오류 response: " + e.response);
    }
  });
  return (
    <>
      <div className={classes.root}>
        <div className={classes.container}>
          <h2>로그인</h2>

          <div className={classes.logform}>
            <form onSubmit={onSubmit}>
              <h3>
                <label htmlFor="email">이메일 주소</label>
              </h3>
              <input
                onFocus={() => setFail(false)}
                id="email"
                placeholder="howwatch@naver.com"
                {...register("email", {
                  required: "이메일은 필수 입력 사항입니다.",
                })}
              />
              <p>{errors.email?.message}</p>
              <div className={classes.pwform}>
                <h3>
                  <label htmlFor="password">비밀번호</label>
                </h3>
              </div>
              <input
                onFocus={() => setFail(false)}
                id="password"
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
                {...register("password", {
                  required: "비밀번호는 필수 입력 사항입니다.",
                })}
              />
              <p>{errors.password?.message}</p>
              {fail && <p style={{ color: "blue" }}>아이디 혹은 비밀번호가 틀렸습니다.</p>}
              <button className={classes.button} type="submit">
                로그인
              </button>
            </form>
            <div className={classes.register}>
              <ul>
                <li className={classes.border}>
                  <NavLink to={"/signup"}>회원 가입</NavLink>
                </li>
                <li className={classes.border}>
                  <NavLink to={"/find"}>아이디 찾기</NavLink>
                </li>
                <li>
                  <NavLink to={"/find"}>비밀번호 찾기</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
