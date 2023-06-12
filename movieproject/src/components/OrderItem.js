import React, { useState, useEffect, useRef } from "react";
import "./OrderItem.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderItem = ({ txs }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const customerid = location.state.id;
  const orderid = txs.id;
  const timedata = new Date(txs.payment.paid_at);

  function onClickDelete(e) {
    axios
      .delete("/customers/" + customerid + "/orders/" + orderid, {
        data: {
          customer_id: customerid,
          order_id: orderid,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        alert("해당 티켓은 예매 취소되었습니다.");
        document.location.href = "/customer";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickOrder(e) {
    navigate("/orderabout", {
      state: { orderid: orderid, customerid: customerid },
    });
  }

  return (
    <li className="OrderListItem">
      <div className="reservenum">주문 번호: {txs.id}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">
        {(() => {
          if (txs.payment.status === "미결제") return "예매 일시";
          else if (txs.payment.status === "결제완료") return "결제 일시";
        })()}
        :{" "}
        {new Date(
          timedata.getTime() - 2 * (timedata.getTimezoneOffset() * 60000)
        )
          .toISOString()
          .substring(0, 19)}
      </div>
      <button className="gotoplan" onClick={onClickOrder}>
        자세히 보기
      </button>
      <button className="ticketdelete" onClick={onClickDelete}>
        {(() => {
          if (txs.payment.status === "미결제") return "티켓 취소하기";
        })()}
      </button>
    </li>
  );
};

export default OrderItem;
