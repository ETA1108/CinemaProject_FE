import React from "react";
import "./PlanItem.scss";
import { Link, useLocation } from "react-router-dom";

const PlanItem_C = ({ txs }) => {
  const id = txs.id;

  const location = useLocation();
  const price = location.state.price;

  return (
    <li className="PlanListItem">
      <div className="time">{txs.screening_started_at.substr(0, 10)}</div>
      <div className="info1">
        {txs.screening_started_at.substr(11)} ~{" "}
        {txs.screening_ended_at.substr(11)}
      </div>
      <div className="info2">상영관: {txs.theater.name}</div>
      <div className="info2">상영회차: {txs.num}</div>

      <Link to={"/seat_c"} state={{ id: id, price: price }}>
        <button className="gotoseat">좌석 보러가기</button>
      </Link>
    </li>
  );
};

export default PlanItem_C;
