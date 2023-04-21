import React from "react";
import "./MyPage.css";
import a1 from "./img/c1.png";

export default function Saleslist() {
  return (
    <>
      <h3 className=" pt-6 pb-8 text-[15px] w-[300px]">판매수량</h3>
      <div className="relative">
        <div className="absolute py-[10px] w-[145px] bg-slate-300 border-2 ">
          <p className="text-center">0</p>
          <p className="text-center">판매 수량</p>
        </div>
        <div className="absolute left-[150px] py-[10px] w-[145px] bg-slate-300 border-2">
          <p className="text-center">0</p>
          <p className="text-center"> 판매 중</p>
        </div>
        <div className="absolute left-[300px] py-[10px] w-[145px] bg-slate-300 border-2">
          <p className="text-center">0</p>
          <p className="text-center">승 인</p>
        </div>
        <div className="absolute left-[450px] py-[10px] w-[145px] bg-slate-300 border-2">
          <p className="text-center">0</p>
          <p className="text-center">거 절</p>
        </div>
      </div>

      <div>
        <div>
          <div className="absolute top-[200px] w-[595px] h-[95px] bg-slate-200 border-2">
            <div>
              <img
                src={a1}
                className="h-[90px] absolute top-[-2px]  right-[504px] "
              />
            </div>
          </div>

          <div className="relative top-[-90px]">
            <div className="absolute top-[220px] left-[100px] ">
              Converse Run star Hike Hi Black White Gum
            </div>
            <div>
              <p className="absolute  top-[268px] left-[100px] ">A등급</p>
            </div>
          </div>
        </div>

        <div>
          <div className="relative left-[10px]">
            <div className="absolute  ml-[330px] mt-[146px]">2023/02/04</div>
            <div className="absolute w-[350px] ml-[350px] mt-[165px]">
              100원
            </div>
          </div>

          <div>
            <div className="relative left-[480px] top-[-180px]">
              <div>
                <p className="absolute top-[340px] right-[200px]">
                  회원 닉네임
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 두번째 칸 시작 */}
      <div>
        <div>
          <div className="absolute top-[300px] w-[595px] h-[95px] bg-slate-200 border-2">
            <div>
              <img
                src={a1}
                className="h-[90px] absolute top-[-2px]  right-[504px] "
              />
            </div>
          </div>

          <div className="relative top-[10px]">
            <div className="absolute top-[220px] left-[100px] ">
              Converse Run star Hike Hi Black White Gum
            </div>
            <div>
              <p className="absolute  top-[268px] left-[100px] ">-</p>
            </div>
          </div>
        </div>

        <div>
          <div className="relative left-[10px]">
            <div className="absolute  ml-[330px] mt-[240px]">2023/02/04</div>
            <div className="absolute ml-[350px] mt-[260px] w-[350px]">
              100원
            </div>
          </div>

          <div>
            <div className="relative left-[480px] top-[-60px]">
              <div>
                <p className="absolute top-[315px] right-[200px]">
                  회원 닉네임{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 세번째 시작 */}
      <div>
        <div>
          <div className="absolute top-[400px] w-[595px] h-[95px] bg-slate-200 border-2">
            <div>
              <img
                src={a1}
                className="h-[90px] absolute top-[-2px]  right-[504px] "
              />
            </div>
          </div>

          <div className="relative top-[105px]">
            <div className="absolute top-[220px] left-[100px] ">
              Converse Run star Hike Hi Black White Gum
            </div>
            <div>
              <p className="absolute  top-[268px] left-[100px] ">-</p>
            </div>
          </div>
        </div>

        <div>
          <div className="relative left-[10px]">
            <div className="absolute  ml-[330px] mt-[340px]">2023/02/04</div>
            <div className="absolute ml-[350px] mt-[360px] w-[350px]">
              100원
            </div>
          </div>

          <div>
            <div className="relative left-[480px] top-[-60px]">
              <div>
                <p className="absolute top-[415px] right-[200px]">
                  회원 닉네임{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
