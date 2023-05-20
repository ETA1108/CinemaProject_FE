import React from "react";
import "./SeatItem.scss";

const SeatItem = ({ txs }) => {
  return (
    //onclick함수로 데이터 담기
    <button className="TxListItem">
      <div className="TxID">{txs.rsoc}</div>
    </button>
  );
};

export default SeatItem;
