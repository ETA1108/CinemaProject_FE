import React from "react";
import "./TicketItem.scss";
import { Link } from "react-router-dom";

const TicketItem = ({ txs }) => {
  return (
    <li className="TxListItem">
      <div className="reservenum">예매번호: {txs.reservation_number}</div>
      <div className="info1">
        영화명: {"영화명 가져오기"}
        상영일: {"상영일 가져오기"}
        상영시간: {"상영시간 가져오기"}, {"시작~끝"}
        상영관 번호: {"상영관 번호 가져오기"}
        좌석번호: {"좌석번호 가져오기"}
        발권여부: {txs.status}
        표준 가격: 판매 가격:
      </div>
    </li>
  );
};

export default TicketItem;
