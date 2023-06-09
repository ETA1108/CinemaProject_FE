import React from "react";
import "./CustomerItem.scss";
import { Link } from "react-router-dom";

const CustomerItem = ({ txs }) => {
  const isjoin = txs.is_verified ? "예" : "아니오";
  const isadult = txs.is_verified_adult ? "예" : "아니오";
  const id = txs.id;

  return (
    <li className="CustomerListItem">
      <div className="id">전화번호: {txs.mobile_number}</div>
      <div className="info1">아이디: {txs.user_id}</div>
      <div className="info1">
        주민등록번호: {txs.resident_registration_number}
      </div>
      <div className="info1">가입 여부: {isjoin}</div>
      <div className="info1">성인 여부: {isadult}</div>
      <div className="info1">보유 포인트: {txs.point}</div>
      <Link to="/customer_order" state={{ id: id }}>
        <button className="gototicket">티켓 조회</button>
      </Link>
    </li>
  );
};

export default CustomerItem;
