import React, { useState } from "react";

const Register = () => {
  const [inputs, setInputs] = useState({});
  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };

    setInputs(nextInputs);
  };

  const onClickRegister = () => {
    console.log(inputs);
  };
  return (
    <>
      {/* <div>
      <ul>
        <ol>
          <a href="#">로그인|</a>
        </ol>
        <ol>
          <a href="#">회원가입|</a>
        </ol>
        <ol>
          <a href="#">고객센터|</a>
        </ol>
        <ol>
          <a href="#">마이페이지</a>
        </ol>
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
              <p>현재 비밀번호</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                placeholder="비밀번호"
              />
            </div>

            <div className="mt-4">
              <p>변경할 비밀번호</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500"
                type="password"
                id="change_password"
                name="change_password"
                onChange={onChange}
                placeholder="변경할 비밀번호"
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

            <div>
              <p>이메일</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="email"
                name="email"
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
                id="phone_number"
                name="phone_number"
                onChange={onChange}
                placeholder="- 없이 입력해주세요."
              />
            </div>

            <div className="mt-4">
              <p>수령인</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userRecip"
                name="userRecip"
                onChange={onChange}
                placeholder="수령인"
              />
            </div>

            <div className="mt-4">
              <p>주소</p>
              <input
                className="mt-1 block w-full pr-8 py-1.5 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500"
                type="text"
                id="userAddress"
                name="userAddress"
                onChange={onChange}
                placeholder="주소"
              />
            </div>

            <div className="mt-8">
              <button
                className="mt-1 block w-full px-8 py-1.5 bg-sky-200 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 "
                type="button"
                onClick={onClickRegister}
                id="joinBtn"
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
