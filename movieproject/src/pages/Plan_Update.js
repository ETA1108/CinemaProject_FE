import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Movie_Create.scss";
import { Link, useLocation } from "react-router-dom";

const Plan_Update = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const location = useLocation();

  const planid = location.state.id;

  const [movieid, setMvid] = useState("");
  const [inputThid, setInputThid] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [prevThid, setprevThid] = useState("");
  const [prevStart, setprevStart] = useState("");
  const [prevEnd, setprevEnd] = useState("");

  const saveInputThid = (e) => {
    setInputThid(e.target.value);
  };
  const saveInputStart = (e) => {
    setInputStart(e.target.value);
  };
  const saveInputEnd = (e) => {
    setInputEnd(e.target.value);
  };
  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current();
      };

      const timerId = setInterval(executeCallback, delay);

      return () => clearInterval(timerId);
    }, []);
  };

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const res1 = await axios.get("/screening-schedules");
        for (let i = 0; i < res1.data.screening_schedules.length; i++) {
          if (res1.data.screening_schedules[i].id === planid) {
            setMvid(res1.data.screening_schedules[i].movie.id);
            setprevThid(res1.data.screening_schedules[i].theater.id);
            setprevStart(res1.data.screening_schedules[i].screening_started_at);
            setprevEnd(res1.data.screening_schedules[i].screening_ended_at);
            break;
          }
        } // 토큰 저장하기
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function onClickUpdate(e) {
    axios
      .patch("/screening-schedules/" + planid, {
        screening_started_at: inputStart + ".432Z",
        screening_ended_at: inputEnd + ".432Z",
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("상영일정이 수정되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="create">
      <h1 style={{ textAlign: "center" }}>상영일정 수정</h1>
      <form onSubmit={onClickUpdate}>
        상영관 번호 (고정)
        <input disabled={true} id="name" type="text" value={prevThid} />
        상영 시작시간<br></br>(YYYY-MM-DDThh:mm:ss 형식)
        <input
          id="time"
          type="text"
          placeholder={prevStart}
          value={inputStart}
          onChange={saveInputStart}
        />
        상영 종료시간<br></br>(YYYY-MM-DDThh:mm:ss 형식)
        <input
          id="rate"
          type="text"
          placeholder={prevEnd}
          value={inputEnd}
          onChange={saveInputEnd}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default Plan_Update;
