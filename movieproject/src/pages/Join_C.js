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
  const [inputPh, setInputPh] = useState("");
  let inputAd = "";

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };
  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const saveInputNum = (e) => {
    setInputNum(e.target.value);
  };

  const saveInputPh = (e) => {
    setInputPh(e.target.value);
  };

  function isadult(num) {
    const year = num.substr(0, 2);
    const realyear = year > 23 ? "19" + year : "20" + year;
    if (realyear > 2004) {
      inputAd = false;
    } else if (realyear <= 2004) {
      inputAd = true;
    }
  }

  function onClickJoin(e) {
    isadult(inputNum);
    fetch("/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: inputId,
        password: inputPw,
        resident_registration_number: inputNum,
        is_verified: true,
        is_verified_adult: inputAd,
        point: 0,
        mobile_number: inputPh,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/";
        alert("회원가입을 축하합니다!");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="join">
      <h1 style={{ textAlign: "center" }}>회원가입</h1>
      <form onSubmit={onClickJoin}>
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
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default Join;
