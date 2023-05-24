import React from "react";
import "./PlanItem.scss";
import { Link } from "react-router-dom";

const PlanItem = ({ txs }) => {
  const id = txs.id;

  function onClickDelete(e) {
    // delete로 바꾸기
    fetch("/screening-schedules", {})
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/movie";
        alert("해당 상영일정이 삭제되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }
  return (
    <li className="PlanListItem">
      <div className="time">
        {txs.screening_started_at} ~ {txs.screening_ended_at}
      </div>
      <div className="info1">{txs.theater_id}관</div>

      <Link to={"/seat"} state={{ id: id }}>
        <button className="gotoseat">좌석 보러가기</button>
      </Link>
      <Link to={"/plan_update"} state={{ id: id }}>
        <button className="planupdate">상영일정 수정하기</button>
      </Link>
      <button className="plandelete" onClick={onClickDelete}>
        상영일정 삭제하기
      </button>
    </li>
  );
};

export default PlanItem;
