import React from "react";
import "./MovieItem.scss";
import { Link } from "react-router-dom";

const MovieItem = ({ txs }) => {
  const link = "/movies/" + txs.name + "/screening-schedules";

  return (
    <li className="TxListItem">
      <div className="name">{txs.name}</div>
      <div className="info1">
        {txs.genre} | {txs.running_time}분 | {txs.release_date} 개봉
      </div>
      <div className="info2">감독: {txs.director_name}</div>
      <div className="info2">배우: {txs.distributor_name} 등</div>
      <div className="info2">별점: {txs.rating}</div>
      <Link to={"/movies/" + txs.id + "/screening-schedules"}>
        <button className="gotoplan">상영일정 보러가기</button>
      </Link>
    </li>
  );
};

export default MovieItem;
