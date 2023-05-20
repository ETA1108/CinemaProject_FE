import React from "react";
import "./MovieItem.scss";
import {
  TbBattery,
  TbBattery1,
  TbBattery2,
  TbBattery3,
  TbBattery4,
} from "react-icons/tb";

const MovieItem = ({ txs }) => {
  const battery = () => {
    if (txs.rsoc === 0) {
      return <TbBattery size="60" />;
    } else if (txs.rsoc <= 25 && txs.rsoc > 0) return <TbBattery1 size="60" />;
    else if (txs.rsoc <= 50 && txs.rsoc > 25) return <TbBattery2 size="60" />;
    else if (txs.rsoc <= 75 && txs.rsoc > 50) return <TbBattery3 size="60" />;
    else if (txs.rsoc <= 100 && txs.rsoc > 75) return <TbBattery4 size="60" />;
  };
  return (
    <li className="TxListItem">
      <div className="TxID">{txs.index}</div>
      <div className="TxState">
        {(() => {
          if (txs.state === 0) return "방전";
          else if (txs.state === 1) return "충전";
          else if (txs.state === 2) return "대기";
          else if (txs.state === 3) return "에러";
        })()}
      </div>
      <div
        className={(() => {
          if (txs.rsoc === 0) {
            if (txs.state === 0) return "TxRosc none zero"; //빨간색
            else if (txs.state === 1) return "TxRosc charging zero"; //초록색
            else if (txs.state === 2) return "TxRosc waiting zero"; // 회색
            else if (txs.state === 3) return "TxRosc error zero"; //흰색, 배경:빨강
          } else if (txs.rsoc <= 25 && txs.rsoc > 0) {
            if (txs.state === 0) return "TxRosc none first"; //빨간색
            else if (txs.state === 1) return "TxRosc charging first"; //초록색
            else if (txs.state === 2) return "TxRosc waiting first"; // 회색
            else if (txs.state === 3) return "TxRosc error first";
          } else if (txs.rsoc <= 50 && txs.rsoc > 25) {
            if (txs.state === 0) return "TxRosc none2"; //빨간색
            else if (txs.state === 1) return "TxRosc charging second"; //초록색
            else if (txs.state === 2) return "TxRosc waiting second"; // 회색
            else if (txs.state === 3) return "TxRosc error second";
          } else if (txs.rsoc <= 75 && txs.rsoc > 50) {
            if (txs.state === 0) return "TxRosc none third"; //빨간색
            else if (txs.state === 1) return "TxRosc charging third"; //초록색
            else if (txs.state === 2) return "TxRosc waiting third"; // 회색
            else if (txs.state === 3) return "TxRosc error third";
          } else if (txs.rsoc <= 100 && txs.rsoc > 75) {
            if (txs.state === 0) return "TxRosc none forth"; //빨간색
            else if (txs.state === 1) return "TxRosc charging forth"; //초록색
            else if (txs.state === 2) return "TxRosc waiting forth"; // 회색
            else if (txs.state === 3) return "TxRosc error forth";
          }
        })()}
      >
        {battery()}
      </div>
    </li>
  );
};

export default MovieItem;
