import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  // 지정된 ID를 가진 유저에 대한 요청

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const saveInputId = (e) => {
    setInputId(e.target.value);
    console.log(e.target.value);
  };

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
    console.log(e.target.value);
  };

  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);
    axios
      .post("/login", {
        user_id: inputId, // 인덱스 맞게 고치기
        encrypted_password: inputPw,
      })
      .then((res) => {
        console.log(res);
        console.log("res.data.userId :: ", res.data.user_id);
        console.log("res.data.msg :: ", res.data.msg);
        if (res.data.user_id === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log("======================", res.data.msg);
          alert("입력하신 id 가 일치하지 않습니다.");
        } else if (res.data.user_id === null) {
          // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
          console.log(
            "======================",
            "입력하신 비밀번호 가 일치하지 않습니다."
          );
          alert("입력하신 비밀번호 가 일치하지 않습니다.");
        } else if (res.data.user_id === inputId) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log("======================", "로그인 성공");
          sessionStorage.setItem("user_id", inputId);
        }
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie_c";
      })
      .catch();
  };

  const check = (id, pw) => {
    if (id === "master" && pw === "master") {
      document.location.href = "/movie";
    }
  };

  return (
    <div className="login">
      <h1>서울 시네마</h1>
      <form>
        <input
          id="id"
          type="text"
          placeholder="ID"
          value={inputId}
          onChange={saveInputId}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={inputPw}
          onChange={saveInputPw}
        />
        <button type="submit" onClick={onClickLogin}>
          로그인
        </button>
        <button type="submit" onClick={check(inputId, inputPw)}>
          관리자 로그인
        </button>
      </form>
      <Link to="/join">
        <button className="join">회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
