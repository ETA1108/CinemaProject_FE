import React from "react";
import "./TicketItem.scss";
import { Link } from "react-router-dom";

const TicketItem_Mypage = ({ txs }) => {
  return (
    <li className="TxListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">
        결제 방법: {txs.payment.method}
        결제 여부: {txs.payment.status}
        카드 번호: {txs.payment.approval_number}
        표준 가격: {txs.payment.original_price}
        판매 가격: {txs.payment.amount}
        결제 일시: {txs.payment.paid_at}
      </div>
      {/*
      <ul className="TxList">
        {txs.map((txs) => (
          <TicketItem txs={txs} key={txs.id} />
        ))}
      </ul>
        */}
      <Link to="/pay_c">
        <button className="gotopay">결제하러 가기</button>
      </Link>
    </li>
  );
};

export default TicketItem_Mypage;
