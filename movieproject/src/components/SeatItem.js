import React from "react";
import "./SeatItem.scss";

const SeatItem = ({ txs }) => {
  for (let i = 0; i < txs.length; i++) {
    return (
      <button className="TxListItem">
        <div className="TxID">{txs[i]}</div>
      </button>
    );
  }
};

export default SeatItem;
