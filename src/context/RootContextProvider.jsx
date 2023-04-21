import { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";

//^ 태그 사이에 들어가면 children이라는 값으로 자식의 컴포넌트나 함수를 받을 수 있음.
//^ children : 약속된 문법
export const MemberContext = createContext(null);
export const SetMemberContext = createContext(() => {});
export const RootContextProvider = ({ children }) => {
  const [memberId, setMemberId] = useState(-1);

  return (
    <SetMemberContext.Provider value={setMemberId}>
      <MemberContext.Provider value={memberId}>
        <BrowserRouter>{children}</BrowserRouter>
      </MemberContext.Provider>
    </SetMemberContext.Provider>
  );
};
