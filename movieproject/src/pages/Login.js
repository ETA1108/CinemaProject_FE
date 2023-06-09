import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Login = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputMn, setInputMn] = useState("");
  const navigate = useNavigate();

  const saveInputId = (e) => {
    setInputId(e.target.value);
  };

  const saveInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const saveInputMn = (e) => {
    setInputMn(e.target.value);
  };

  function onClickLogin(e) {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: inputId,
        password: inputPw,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          sessionStorage.setItem("user_id", inputId);
          document.location.href = "/movie_c";
        } else {
          alert("다시 로그인해주세요.");
        }
      })
      .catch(() => {});
    e.preventDefault();
  }

  const check = (id, pw) => {
    if (id === "master" && pw === "master") {
      document.location.href = "/movie";
    }
  };

  function onClickNonMemberPage(e) {
    navigate("/mypage_nm", {
      state: { mobilenumber: inputMn },
    });
  }

  return (
    <>
      <div className="nonmemberlogin">
        <Link to="/movie_c">
          <button className="nonmembergo">비회원 주문하기</button>
        </Link>
        <button className="nonmembergo" onClick={() => setModalIsOpen(true)}>
          비회원 주문내역 확인
        </button>
      </div>
      <div className="login">
        <h1>서울 시네마</h1>
        <form onSubmit={onClickLogin}>
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
          <button type="submit">로그인</button>
        </form>
        <button className="join" onClick={() => check(inputId, inputPw)}>
          관리자 로그인
        </button>
        <Link to="/join">
          <button className="join">회원가입</button>
        </Link>
      </div>
      <Modal
        style={{
          overlay: {
            zIndex: 100,
          },
        }}
        className="content"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <form onSubmit={onClickNonMemberPage}>
          전화번호
          <input
            id="password"
            type="text"
            placeholder="Password"
            value={inputMn}
            onChange={saveInputMn}
          />
          <button type="submit">주문내역 확인하기</button>
        </form>
      </Modal>
    </>
  );
};

export default Login;
