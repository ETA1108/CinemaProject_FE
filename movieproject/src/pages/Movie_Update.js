import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Movie_Create.scss";
import { Link, useLocation } from "react-router-dom";

const Movie_Update = () => {
  // 지정된 ID를 가진 유저에 대한 요청
  const location = useLocation();

  const movieid = location.state.id;
  const moviename = location.state.name;

  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputDirector, setInputDirector] = useState("");
  const [inputRelease, setInputRelease] = useState("");
  const [inputDistributor, setInputDistributor] = useState("");
  const [inputRate, setInputRate] = useState("");
  const [prevTime, setprevTime] = useState("");
  const [prevGenre, setprevGenre] = useState("");
  const [prevDirector, setprevDirector] = useState("");
  const [prevRelease, setprevRelease] = useState("");
  const [prevDistributor, setprevDistributor] = useState("");
  const [prevRate, setprevRate] = useState("");

  const saveInputTime = (e) => {
    setInputTime(e.target.value);
  };
  const saveInputGenre = (e) => {
    setInputGenre(e.target.value);
  };
  const saveInputDirector = (e) => {
    setInputDirector(e.target.value);
  };
  const saveInputRelease = (e) => {
    setInputRelease(e.target.value);
  };
  const saveInputDistributor = (e) => {
    setInputDistributor(e.target.value);
  };
  const saveInputRate = (e) => {
    setInputRate(e.target.value);
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
        const res1 = await axios.get("/movies");
        for (let i = 0; i < res1.data.movies.length; i++) {
          if (res1.data.movies[i].id === movieid) {
            setprevTime(res1.data.movies[i].running_time);
            setprevGenre(res1.data.movies[i].genre);
            setprevDirector(res1.data.movies[i].director_name);
            setprevRelease(res1.data.movies[i].release_date);
            setprevDistributor(res1.data.movies[i].distributor_name);
            setprevRate(res1.data.movies[i].rating);
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
    fetch("/movies", {
      //put으로 바꾸기
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        running_time: +inputTime,
        genre: inputGenre,
        director_name: inputDirector,
        release_date: inputRelease,
        distributor_name: inputDistributor,
        rating: inputRate,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("영화가 수정되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="create">
      <h1 style={{ textAlign: "center" }}>
        영화 수정 - {"<"}
        {moviename}
        {">"}
      </h1>
      <form onSubmit={onClickUpdate}>
        상영시간
        <input
          id="time"
          type="text"
          placeholder={prevTime}
          value={inputTime}
          onChange={saveInputTime}
        />
        장르
        <input
          id="genre"
          type="text"
          placeholder={prevGenre}
          value={inputGenre}
          onChange={saveInputGenre}
        />
        등급- 감독명
        <input
          id="director"
          type="text"
          placeholder={prevDirector}
          value={inputDirector}
          onChange={saveInputDirector}
        />
        개봉일
        <input
          id="release"
          type="text"
          placeholder={prevRelease}
          value={inputRelease}
          onChange={saveInputRelease}
        />
        배급사
        <input
          id="distributor"
          type="text"
          placeholder={prevDistributor}
          value={inputDistributor}
          onChange={saveInputDistributor}
        />
        평점
        <input
          id="rate"
          type="text"
          placeholder={prevRate}
          value={inputRate}
          onChange={saveInputRate}
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default Movie_Update;
