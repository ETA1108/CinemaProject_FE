import React from "react";
import "./MovieItem.scss";
import { Link } from "react-router-dom";
import noimage from "./images/noimage.png";
import axios from "axios";

const MovieItem = ({ txs }) => {
  const name = txs.name;
  const id = txs.id;

  function onClickDelete(e) {
    if (window.confirm("해당 영화를 삭제하시겠습니까?")) {
      //true는 확인버튼을 눌렀을 때 코드 작성
      axios
        .delete("/movies/" + id, {
          data: {
            id: id,
          },
        })
        .then((res) => {
          document.location.href = "/movie";
          alert("해당 영화가 삭제되었습니다.");
        })
        .catch((error) => {
          alert("해당 영화의 상영일정을 모두 삭제한 후 삭제해주세요.");
        });
    } else {
    }
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
      <div className="info1">{"영화소개"}</div>
      <div className="info2">배급사: {txs.distributor_name} 등</div>
      <div className="info2">감독: {txs.director_name}</div>
      <div className="info2">배우: {"배우이름"} 등</div>
      <div className="info2">가격: {"가격"}</div>
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
