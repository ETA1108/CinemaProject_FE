import React, { useState } from "react";
import "./MovieItem.scss";
import { Link } from "react-router-dom";
import noimage from "./images/noimage.png";
import Modal from "react-modal";

const MovieItem_C = ({ txs }) => {
  const name = txs.name;
  const id = txs.id;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <li className="MovieListItem" style={{ zIndex: 50 }}>
        <div className="image">
          <img src={noimage} />
        </div>
        <div className="name">{txs.name}</div>
        <div className="info1">
          {txs.genre} | {txs.running_time}분 | {txs.release_date} 개봉
        </div>
        <div className="info1">
          <button className="gotocontent" onClick={() => setModalIsOpen(true)}>
            영화 소개
          </button>
        </div>
        <div className="info2">배급사: {txs.distributor_name} 등</div>
        <div className="info2">감독: {txs.director_name}</div>
        <div className="info2">배우: {"배우이름"} 등</div>
        <div className="info2">가격: {"가격"}</div>
        <div className="info2">별점: {txs.rating}</div>
        <Link to="/plan_c" state={{ name: name, id: id }}>
          <button className="gotoplan">상영일정 보러가기</button>
        </Link>
      </li>
      <Modal
        style={{
          overlay: {
            zIndex: 100,
          },
        }}
        className="content"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {txs.name}
        <br />
        {"영화소개"}
      </Modal>
    </>
  );
};

export default MovieItem_C;
