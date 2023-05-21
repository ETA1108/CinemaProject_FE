import React from "react";
import "./RoomItem.scss";

const RoomItem = ({ txs }) => {
  return (
    //상영관 번호 담기
    <button className="TxListItem">
      <div className="TxID">
        {txs.rsoc}
        {"상영관"}
      </div>
    </button>
  );
};

export default RoomItem;
