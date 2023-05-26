import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Movie_Create.scss";
import { Link, useLocation } from "react-router-dom";

const Plan_Create = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const location = useLocation();

  const movieid = location.state.id;
  const moviename = location.state.name;

  const [inputThid, setInputThid] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

  const saveInputThid = (e) => {
    setInputThid(e.target.value);
  };
  const saveInputStart = (e) => {
    setInputStart(e.target.value);
  };
  const saveInputEnd = (e) => {
    setInputEnd(e.target.value);
  };

  function onClickCreate(e) {
    fetch("/screening-schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieid,
        theater_id: +inputThid,
        screening_started_at: inputStart,
        screening_ended_at: inputEnd,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        //document.location.href = "/movie";
        alert("상영일정이 추가되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="create">
      <h1 style={{ textAlign: "center" }}>
        상영일정 추가 - {"<"}
        {moviename}
        {">"}
      </h1>
      <form onSubmit={onClickCreate}>
        상영관 번호
        <input
          id="name"
          type="text"
          value={inputThid}
          onChange={saveInputThid}
        />
        상영 시작시간
        <input
          id="time"
          type="text"
          value={inputStart}
          onChange={saveInputStart}
        />
        상영 종료시간
        <input
          id="genre"
          type="text"
          value={inputEnd}
          onChange={saveInputEnd}
        />
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};

export default Plan_Create;
