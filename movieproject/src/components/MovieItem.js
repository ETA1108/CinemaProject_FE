import React from "react";
import "./MovieItem.scss";
import { Link } from "react-router-dom";
import noimage from "./images/noimage.png";
import axios from "axios";

const MovieItem = ({ txs }) => {
  const name = txs.name;
  const id = txs.id;

  function onClickDelete(e) {
    axios
      .delete("/movies/" + id, {
        data: {
          id: id,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("해당 영화가 삭제되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <li className="MovieListItem">
      <div className="image">
        <img src={noimage} />
      </div>
      <div className="name">{txs.name}</div>
      <div className="info1">
        {txs.genre} | {txs.running_time}분 | {txs.release_date} 개봉
      </div>
      <div className="info2">감독: {txs.director_name}</div>
      <div className="info2">배우: {txs.distributor_name} 등</div>
      <div className="info2">별점: {txs.rating}</div>
      <Link to="/plan" state={{ name: name, id: id }}>
        <button className="gotoplan">상영일정 보러가기</button>
      </Link>
      <Link to="/movie_update" state={{ name: name, id: id }}>
        <button className="movieupdate">영화 수정하기</button>
      </Link>
      <button className="moviedelete" onClick={onClickDelete}>
        영화 삭제하기
      </button>
    </li>
  );
};

export default MovieItem;
