import React, { useState } from "react";
import { get, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addWatch } from "../../api/watches";
import classes from "./Product.module.css";
import AWS from "aws-sdk";

//상품등록페이지
const Product = () => {
  // const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [result, setResult] = useState(-1);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //aws관련 부분
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
  });

  //파일 선택 시 function
  const handleFileInput = (e) => {
    // setSelectedFile(e.target.files[0]);

    setSelectedFiles(Array.from(e.target.files));
  };

  //aws로 파일을 보내는 함수
  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: "img/" + file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", () => {
        setTimeout(() => {
          // setSelectedFile(null);
          setSelectedFiles([]);
        }, 3000);
      })
      .send((err) => {
        if (err) console.log("에러 : ", err);
      });
  };
  //여러 이미지를 받아 aws로 파일을 보내는 함수
  const uploadFiles = (fileList) => {
    fileList.forEach((file) => {
      uploadFile(file);
    });
  };

  //제품 등록 후 이동하기 위해 useNavigate 사용
  const navigate = useNavigate();

  //제품 등록 함수
  const onSubmit = handleSubmit(async (input) => {
    try {
      const getData = await addWatch(input);
      // console.log(getData.data);
      if (getData.data === 1) {
        uploadFiles(selectedFiles);
        alert("판매요청이 완료되었습니다.");
        navigate("/mypage/apply");
        return;
      }
    } catch (e) {}
    alert("업로드 오류!");
  });

  return (
    <form onSubmit={onSubmit}>
      <div className={classes.root}>
        {/* <input type="date" name="" id="" /> */}
        <h3>모든 상품은 철저한 검수를 진행하고 있습니다</h3>
        <div>
          <label htmlFor="name">제품 이름</label>
          <input
            type="text"
            id="name"
            placeholder="브랜드와 모델명 정확하게 작성해주세요"
            {...register("name", {
              required: "필수 입력사항입니다.",
            })}
          />
        </div>
        <div>
          <label htmlFor="price">희망 판매가</label>
          <input
            type="number"
            id="price"
            placeholder="판매가는 검수 후 변경될 수 있습니다"
            {...register("price", {
              required: "필수 입력사항입니다.",
            })}
          />
        </div>
        <div>
          <label htmlFor="category">종류</label>
          <br />
          <select
            id="category"
            {...register("category")}
            defaultValue={"quartz"}
          >
            <option value="quartz">쿼츠</option>
            <option value="automatic">오토매틱</option>
            <option value="digital">디지털</option>
            <option value="etc">기타</option>
          </select>
        </div>
        <div>
          <label htmlFor="images">이미지첨부</label>
          <input
            style={{ fontSize: "14px", color: "#333" }}
            id="images"
            type="file"
            multiple
            {...register("images", {
              required: "필수 입력사항입니다.",
            })}
            onChange={handleFileInput}
          />
        </div>
        <div>
          <label htmlFor="description">특이사항</label>
          <textarea
            type="text"
            id="description"
            placeholder="구입시기, 구입경로, 하자 등 자세하게 작성해주세요"
            maxLength={300}
            {...register("description", {
              required: "필수 입력사항입니다.",
            })}
          ></textarea>
        </div>
        <button className={classes.button} type="submit">
          <div>판매 요청하기</div>
        </button>
      </div>
    </form>
  );
};
export default Product;
