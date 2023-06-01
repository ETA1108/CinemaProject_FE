import React from "react";
import "./PlanItem.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const PlanItem = ({ txs }) => {
  const id = txs.id;

  function onClickDelete(e) {
    if (window.confirm("해당 상영일정을 삭제하시겠습니까?")) {
      axios
        .delete("/screening-schedules/" + id, {
          data: {
            id: id,
          },
        })
        .then((res) => {
          // 작업 완료 되면 페이지 이동(새로고침)
          document.location.href = "/movie";
          alert("해당 상영일정이 삭제되었습니다.");
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
    }
    e.preventDefault();
  }
  return (
    <li className="PlanListItem">
      <div className="time">{txs.screening_started_at.substr(0, 10)}</div>
      <div className="info1">
        {txs.screening_started_at.substr(11)} ~{" "}
        {txs.screening_ended_at.substr(11)}
      </div>
      <div className="info2">상영관: {txs.theater.name}</div>
      <div className="info2">상영회차: {"상영회차"}</div>

      <Link to={"/seat"} state={{ id: id }}>
        <button className="gotoseat">좌석 보러가기</button>
      </Link>
      <Link to={"/plan_update"} state={{ id: id }}>
        <button className="planupdate">일정 수정하기</button>
      </Link>
      <button className="plandelete" onClick={onClickDelete}>
        일정 삭제하기
      </button>
    </li>
  );
};

export default PlanItem;
