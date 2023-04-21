import React, { useState } from "react";

export default function App() {
  let userId = document.querySelector("#userId");
  let passwordForm = document.querySelector("#userPW");
  let re_passwordForm = document.querySelector("#re_password");

  const [inputs, setInputs] = useState({
    userId: "",
    userPW: "",
    re_password: "",
    userName: "",
    userMail: "",
    userPhone: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };

  function CheckPass(str) {
    //비밀번호 정규식
    let reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;
    return reg1.test(str);
  }

  function letsJoin() {
    //로그인 유효성 검사
    if (inputs.userId === "") {
      alert("아이디를 입력해주세요!");
      userId.focus();
      return;
    } else if (inputs.userPW === "") {
      alert("비밀번호를 입력해주세요!");
      passwordForm.focus();
      return;
    } else if (inputs.re_password === "") {
      alert("비밀번호 중복 확인을 입력해주세요!");
      re_passwordForm.focus();
      return;
    } else if (CheckPass(inputs.userPW) === false) {
      alert("비밀번호는 영문+숫자 6자를 조합하여 입력해주세요 !");
      passwordForm.focus();
      return;
    } else if (inputs.re_password !== inputs.userPW) {
      alert("비밀번호가 동일하지 않습니다!");
      re_passwordForm.focus();
      return;
    } else {
      fetch("/register", {
        //원하는 주소 입력
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: inputs.userId,
          userPW: inputs.userPW,
        }),
      })
        .then((res) => res.json())
        .then((resonse) => {
          if (resonse === true) {
            window.location.replace("/원하는 주소");
          } else {
            alert("다시 시도해주세요");
          }
        });
    }
  }

  return (
    <>
      {/* <div>
        <ul>
          <oi>
            <a href="#">로그인|</a>
          </oi>
          <oi>
            <a href="#">회원가입|</a>
          </oi>
          <oi>
            <a href="#">고객센터|</a>
          </oi>
          <oi>
            <a href="#">마이페이지</a>
          </oi>
        </ul>
      </div> */}
      {/* 헤더라 따로 안 건드립니다 나중에 헤더 추가되면 그 때 할게요 */}
      {/* div 부모로 묶은 테그입니다 !!!건드리면 푸터 이상해져요 */}
      <div className="relative min-h-[600px] pb-[10px] h-full">
        {/* 가운데 회원가입 박스 코드입니다*/}
        <div className="absolute top-[40px] left-[40%] bg-slate-300 rounded-md w-[200px] h-[60px] text-2xl leading-[60px] text-center">
          <h2>회원가입</h2>
        </div>
        <div className="absolute top-[140px] left-[40%] text-sm">
          <form>
            <div>
              <p>아이디</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userId"
                name="userId"
                onChange={onChange}
                placeholder="아이디"
              />
            </div>
            <div className="mt-4">
              <p>비밀번호</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="userPW"
                name="userPW"
                onChange={onChange}
                placeholder="비밀번호"
              />
            </div>

            <div className="mt-4">
              <p>비밀번호 확인</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="re_password"
                name="re_password"
                onChange={onChange}
                placeholder="비밀번호 확인"
              />
            </div>

            <div className="mt-4">
              <p>이름</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userName"
                name="userName"
                onChange={onChange}
                placeholder="이름"
              />
            </div>

            <div className="mt-4">
              <p>이메일</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userMail"
                name="userMail"
                onChange={onChange}
                placeholder="이메일"
              />
            </div>

            <div className="mt-4">
              <p>휴대전화</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userPhone"
                name="userPhone"
                onChange={onChange}
                placeholder="휴대전화"
              />
            </div>

            <div className="mt-8">
              <input
                className="mt-1 block w-full px-8 py-1.5 bg-sky-200 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="button"
                onClick={letsJoin}
                id="joinBtn"
                value="가입하기"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
