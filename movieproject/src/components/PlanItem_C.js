import React from "react";
import "./PlanItem.scss";
import { Link } from "react-router-dom";

const PlanItem_C = ({ txs }) => {
  const id = txs.id;

  return (
    <li className="PlanListItem">
      <div className="time">{txs.screening_started_at.substr(0, 10)}</div>
      <div className="info1">
        {txs.screening_started_at.substr(11)} ~{" "}
        {txs.screening_ended_at.substr(11)}
      </div>
      <div className="info2">상영관: {txs.theater.name}</div>
      <div className="info2">상영회차: {"상영회차"}</div>

      <Link to={"/seat_c"} state={{ id: id }}>
        <button className="gotoseat">좌석 보러가기</button>
      </Link>
    </li>
  );
};

export default PlanItem_C;
