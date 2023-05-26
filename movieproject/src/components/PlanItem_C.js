import React from "react";
import "./PlanItem.scss";
import { Link } from "react-router-dom";

const PlanItem_C = ({ txs }) => {
  const id = txs.id;

  return (
    <li className="PlanListItem">
      <div className="time">
        {txs.screening_started_at} ~ {txs.screening_ended_at}
      </div>
      <div className="info1">{txs.theater_id}관</div>

      <Link to={"/seat_c"} state={{ id: id }}>
        <button className="gotoseat">좌석 보러가기</button>
      </Link>
    </li>
  );
};

export default PlanItem_C;
