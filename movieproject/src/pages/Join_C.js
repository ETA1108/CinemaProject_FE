import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Join.scss";
import { Link } from "react-router-dom";

const Join = () => {
  // 지정된 ID를 가진 유저에 대한 요청

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputNum, setInputNum] = useState("");
  const [inputAd, setInputAd] = useState("1");
  const [inputPh, setInputPh] = useState("");

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };
  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const saveInputNum = (e) => {
    setInputNum(e.target.value);
  };
  const saveInputAd = (e) => {
    setInputAd(e.target.value);
    console.log(inputAd);
  };
  const saveInputPh = (e) => {
    setInputPh(e.target.value);
  };

  const onClickJoin = () => {
    axios
      .post("/customers", null, {
        params: {
          user_id: inputId,
          encrypted_password: inputPw,
          resident_registration_number: inputNum,
          is_verfied: true,
          is_verified_adult: inputAd,
          mobile_number: inputPh,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
        alert("회원가입을 축하합니다!");
      })
      .catch();
  };

  return (
    <div className="join">
      <h1 style={{ textAlign: "center" }}>회원가입</h1>
      <form>
        ID
        <input id="id" type="text" value={inputId} onChange={saveInputId} />
        비밀번호
        <input
          id="password"
          type="password"
          value={inputPw}
          onChange={saveInputPw}
        />
        주민등록번호{" ('-'없이)"}
        <input
          id="renumber"
          type="text"
          value={inputNum}
          onChange={saveInputNum}
        />
        전화번호
        <input
          id="phonenumber"
          type="text"
          value={inputPh}
          onChange={saveInputPh}
        />
        성인 여부{" (만 19세 이상 여부)"}
        <div>
          <input
            type="radio"
            id="isadult"
            value="1"
            checked={inputAd === "1" ? true : false}
            onChange={saveInputAd}
          ></input>
          <div className="text">예</div>
          <input
            type="radio"
            id="isadult"
            value="0"
            checked={inputAd === "0" ? true : false}
            onChange={saveInputAd}
          ></input>
          <div className="text">아니오</div>
        </div>
        <button type="submit" onClick={onClickJoin}>
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Join;
