import React from "react";
import "./PlanItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const PlanAllItem = ({ txs }) => {
  const id = txs.id;

  return (
    <li className="PlanListItem">
      <div className="name">
        {"<"}
        {txs.movie.name}
        {">"}
      </div>
      <div className="time">{txs.screening_started_at.substr(0, 10)}</div>
      <div className="info1">
        {txs.screening_started_at.substr(11)} ~{" "}
        {txs.screening_ended_at.substr(11)}
      </div>

      <div className="info2">상영관: {txs.theater.name}</div>
    </li>
  );
};

export default PlanAllItem;
