import React from "react";
import "./OrderItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderItem_C = ({ txs }) => {
  const id = txs.id;

  function onClickDelete(e) {
    axios
      .delete("/movies/" + id, {
        //수정
        data: {
          id: id,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage";
        alert("해당 티켓은 예매 취소되었고, 결제 금액은 환불됩니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <li className="OrderListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">결제 방법: {txs.payment.method}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">카드 번호: {txs.payment.approval_number}</div>
      <div className="info1">표준 가격: {txs.payment.original_price}</div>
      <div className="info1">판매 가격: {txs.payment.amount}</div>
      <div className="info1">결제 일시: {txs.payment.paid_at}</div>
      <Link to="/orderabout" state={{ id: id }}>
        <button className="gotoplan">자세히 보기</button>
      </Link>
      <Link to="/order_update" state={{ id: id }}>
        <button className="ticketupdate">티켓 수정하기</button>
      </Link>
      <button className="ticketdelete" onClick={onClickDelete}>
        티켓 삭제하기
      </button>
    </li>
  );
};

export default OrderItem_C;
