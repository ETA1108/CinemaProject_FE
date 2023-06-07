import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Movie_Create.scss";
import { Link } from "react-router-dom";
import test1 from "../components/images/남은 인생 10년.jpg";

const Movie_Create = () => {
  // 지정된 ID를 가진 유저에 대한 요청

  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputGenre, setInputGenre] = useState("");
  const [inputDirector, setInputDirector] = useState("");
  const [inputRelease, setInputRelease] = useState("");
  const [inputDistributor, setInputDistributor] = useState("");
  const [inputRate, setInputRate] = useState("");
  const [inputCast, setInputCast] = useState("");
  const [inputSynopsis, setInputSynopsis] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [file, setFile] = useState(null);

  const saveInputName = (e) => {
    setInputName(e.target.value);
  };
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
  const saveInputCast = (e) => {
    setInputCast(e.target.value);
  };
  const saveInputSynopsis = (e) => {
    setInputSynopsis(e.target.value);
  };
  const saveInputPrice = (e) => {
    setInputPrice(e.target.value);
  };

  const onChangeImg = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      formData.append("file", uploadFile);
      setFile(uploadFile);
    }
  };

  function onClickCreate(e) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", inputName);
    formData.append("running_time", +inputTime);
    formData.append("genre", inputGenre);
    formData.append("director_name", inputDirector);
    formData.append("release_date", inputRelease);
    formData.append("distributor_name", inputDistributor);
    formData.append("rating", inputRate);
    formData.append("cast", inputCast);
    formData.append("synopsis", inputSynopsis);
    formData.append("price", +inputPrice);

    fetch("/movies", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("영화가 추가되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="create">
      <h1 style={{ textAlign: "center" }}>영화 등록</h1>
      <form onSubmit={onClickCreate}>
        영화명
        <input
          id="name"
          type="text"
          value={inputName}
          onChange={saveInputName}
        />
        상영시간
        <input
          id="time"
          type="text"
          value={inputTime}
          onChange={saveInputTime}
        />
        장르
        <input
          id="genre"
          type="text"
          value={inputGenre}
          onChange={saveInputGenre}
        />
        등급
        <input
          id="rating"
          type="text"
          value={inputRate}
          onChange={saveInputRate}
        />
        배급사
        <input
          id="distributor"
          type="text"
          value={inputDistributor}
          onChange={saveInputDistributor}
        />
        감독명
        <input
          id="director"
          type="text"
          value={inputDirector}
          onChange={saveInputDirector}
        />
        배우명
        <input
          id="director"
          type="text"
          value={inputCast}
          onChange={saveInputCast}
        />
        개봉일
        <input
          id="release"
          type="text"
          value={inputRelease}
          onChange={saveInputRelease}
        />
        가격
        <input
          id="release"
          type="text"
          value={inputPrice}
          onChange={saveInputPrice}
        />
        영화소개
        <input
          id="intro"
          type="text"
          value={inputSynopsis}
          onChange={saveInputSynopsis}
        />
        영화 포스터
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          onChange={onChangeImg}
        />
        <button type="submit">추가하기</button>
      </form>
    </div>
  );
};

export default Movie_Create;
