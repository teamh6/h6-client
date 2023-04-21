import React from "react";
import { useState } from "react";
import { loadWatches } from "../../api/watches";

const Test = () => {
  const [data, setData] = useState({});
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const onTest = async () => {
    try {
      const getData = await loadWatches();
      console.log(getData.data);
      setIsLoading(true);
    } catch (e) {}
  };

  return (
    <div>
      <p>테스트 페이지 입니다.</p>
      <button onClick={onTest}>테스트 시작</button>
    </div>
  );
};

export default Test;
