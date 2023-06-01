import React from "react";
import "./OrderItem.scss";
import { Link, useLocation } from "react-router-dom";

const OrderItem = ({ txs }) => {
  const orderid = txs.id;

  const location = useLocation();

  const customerid = location.state.id;

  return (
    <li className="OrderListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">결제 방법: {txs.payment.method}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">카드 번호: {txs.payment.approval_number}</div>
      <div className="info1">표준 가격: {txs.payment.original_price}</div>
      <div className="info1">판매 가격: {txs.payment.amount}</div>
      <div className="info1">결제 일시: {txs.payment.paid_at}</div>
      <Link
        to="/orderabout"
        state={{ orderid: orderid, customerid: customerid }}
      >
        <button className="gotoplan">자세히 보기</button>
      </Link>
    </li>
  );
};

export default OrderItem;
