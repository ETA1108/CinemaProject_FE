import React from "react";
import "./OrderItem.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const OrderItem = ({ txs }) => {
  const orderid = txs.id;

  const location = useLocation();

  const customerid = location.state.id;
  const paystatus = txs.payment.status;

  function onClickDelete(e) {
    axios
      .delete("/customers/" + customerid + "/orders/" + orderid, {
        //수정
        data: {
          id: orderid,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        if (paystatus === "미결제")
          alert("해당 티켓은 예매 취소되었고, 결제 금액은 환불됩니다.");
        else if (paystatus === "결제완료")
          alert("해당 티켓(결제 내역)은 삭제되었습니다.");
        document.location.href = "/customer";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <li className="OrderListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">표준 가격: {txs.payment.original_price}</div>
      {(() => {
        if (txs.payment.status === "결제완료")
          return (
            <>
              <div className="info1">결제 방법: {txs.payment.method}</div>
              <div className="info1">
                카드 번호: {txs.payment.approval_number}
              </div>
              <div className="info1">판매 가격: {txs.payment.amount}</div>
            </>
          );
      })()}
      <div className="info1">
        {(() => {
          if (txs.payment.status === "미결제") return "예매 일시";
          else if (txs.payment.status === "결제완료") return "결제 일시";
        })()}
        : {txs.payment.paid_at}
      </div>
      <Link
        to="/orderabout"
        state={{ orderid: orderid, customerid: customerid }}
      >
        <button className="gotoplan">자세히 보기</button>
      </Link>
      <button className="ticketdelete" onClick={onClickDelete}>
        티켓{" "}
        {(() => {
          if (txs.payment.status === "미결제") return "취소하기";
          else if (txs.payment.status === "결제완료") return "삭제하기";
        })()}
      </button>
    </li>
  );
};

export default OrderItem;
