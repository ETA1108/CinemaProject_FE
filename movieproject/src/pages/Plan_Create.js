import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Movie_Create.scss";
import { Link, useLocation } from "react-router-dom";

const Plan_Create = () => {
  const location = useLocation();

  const movieid = location.state.id;
  const moviename = location.state.name;

  const [inputThname, setInputThname] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

  const category = [
    //상영관 id, 상영관 이름
    { id: 1, name: "1관" },
    { id: 2, name: "2관" },
    { id: 3, name: "3관" },
    { id: 7, name: "4관" },
    { id: 8, name: "5관" },
    { id: 9, name: "6관" },
    { id: 10, name: "7관" },
    { id: 11, name: "8관" },
  ];

  const saveInputThname = (e) => {
    setInputThname(e.target.value);
  };
  const saveInputStart = (e) => {
    setInputStart(e.target.value);
  };
  const saveInputEnd = (e) => {
    setInputEnd(e.target.value);
  };

  function onClickCreate(e) {
    let id = 0;
    for (let i = 0; i < 8; i++) {
      if (category[i].name === inputThname) {
        id = category[i].id;
        break;
      }
    }
    fetch("/screening-schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: movieid,
        theater_id: id,
        screening_started_at: inputStart + ".432Z",
        screening_ended_at: inputEnd + ".432Z",
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("상영일정이 등록되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="create">
      <h1 style={{ textAlign: "center" }}>
        상영일정 등록 - {"<"}
        {moviename}
        {">"}
      </h1>
      <form onSubmit={onClickCreate}>
        상영관
        <input
          id="name"
          type="text"
          value={inputThname}
          onChange={saveInputThname}
        />
        상영 시작시간<br></br>(YYYY-MM-DDThh:mm:ss 형식)
        <input
          id="time"
          type="text"
          value={inputStart}
          onChange={saveInputStart}
        />
        상영 종료시간<br></br>(YYYY-MM-DDThh:mm:ss 형식)
        <input
          id="profile-upload"
          type="text"
          value={inputEnd}
          onChange={saveInputEnd}
        />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default Plan_Create;
