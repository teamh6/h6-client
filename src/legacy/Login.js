import React, { useState } from "react";

export default function App() {
  let userId = document.querySelector("#userId");
  let userPw = document.querySelector("#userPw"); //아이디 중복 확인 버튼

  const [inputs, setInputs] = useState({
    username: "",
    userPW: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };

  function letsLogin() {
    if (inputs.userId === "") {
      alert("아이디를 입력해주세요.");
      return;
    } else if (inputs.userPw === "false") {
      alert("비밀번호를 입력해주세요");
      return;
    } else {
      fetch("/login", {
        //원하는 주소 입력
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: inputs.username,
          userPW: inputs.userPW,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.Authorization);
          if (response.Authorization == null) {
            alert("아이디 혹은 비밀번호를 확인해주세요.");
          } else {
            alert("로그인 되었습니다");
            window.localStorage.setItem(
              "Authorization",
              response.Authorization
            );
            window.location.href = "/home";
          }
        });
    }
  }
  return (
    <>
      {/* 푸터 위치입니다 수정할시 주의! */}
      <div className="relative min-h-[400px] pb-[10px] h-full">
        {/* 계정 로그인 txt 위치입니다 변경시 user.js랑도 바꿔야하니 알려주세요 */}
        <div className="absolute top-[40px] left-[40%] bg-slate-300 rounded-md w-[200px] h-[60px] text-2xl leading-[60px] text-center">
          <h2>계정 로그인</h2>
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
                name="username"
                placeholder="아이디"
                onChange={onChange}
              />
            </div>

            <div className="mt-8">
              <p>비밀번호</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
               disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="userPw"
                name="userPW"
                placeholder="비밀번호"
                onChange={onChange}
              />
            </div>

            <div className="mt-14">
              <input
                className="mt-1 block w-full px-8 py-1.5 bg-sky-200 border border-slate-300 rounded-md text-[18px] shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="button"
                onClick={letsLogin}
                id="loginBtn"
                value="로그인"
              />
            </div>
          </form>
          <div className="mt-1 ">
            <ul>
              <li>
                <a className="text-[8px]" href="#">
                  회원가입 /{" "}
                </a>
              </li>
              <li>
                <a className="text-[8px]" href="#">
                  아이디 찾기 /{" "}
                </a>
              </li>
              <li>
                <a className="text-[8px]" href="#">
                  비밀번호 찾기
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
