import React, { useState, useEffect, useRef } from "react";
import "./MovieItem.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";

const MovieItem_C = ({ txs }) => {
  const name = txs.name;
  const id = txs.id;
  const price = txs.price;
  const rate = txs.rating;
  const picturepath =
    "https://cinema-prod.s3.ap-northeast-2.amazonaws.com/movies/" +
    name +
    ".jpg";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAdult, setIsAdult] = useState("");
  const navigate = useNavigate();

  const useInterval = (callback, delay) => {
    const savedCallback = useRef(null);

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const executeCallback = () => {
        savedCallback.current();
      };

      const timerId = setInterval(executeCallback, delay);

      return () => clearInterval(timerId);
    }, []);
  };

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
            setIsAdult(res1.data.customers[i].is_verified_adult);
            break;
          }
        } // 토큰 저장하기
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function nochild(prop) {
    if (rate === "청소년 관람불가" && prop === false) {
      alert("미성년자는 청소년 관람불가 영화를 보실 수 없습니다.");
    } else {
      navigate("/plan_c", {
        state: { moviename: name, movieid: id, price: price },
      });
    }
  }

  return (
    <>
      <li className="MovieListItem">
        <div className="image">
          <img src={picturepath} />
        </div>
        <div className="name">{txs.name}</div>
        <div className="info1">
          {txs.genre} | {txs.rating} | {txs.running_time}분 | {txs.release_date}{" "}
          개봉
        </div>
        <div className="info1">
          <button className="gotocontent" onClick={() => setModalIsOpen(true)}>
            영화 소개
          </button>
        </div>
        <div className="info2">배급사: {txs.distributor_name}</div>
        <div className="info2">감독: {txs.director_name}</div>
        <div className="info2">배우: {txs.cast}</div>
        <div className="info2">가격: {txs.price}원</div>
        <button className="gotoplan" onClick={() => nochild(isAdult)}>
          상영일정 보러가기
        </button>
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
        <div className="name">{txs.name}</div>
        {txs.synopsis}
      </Modal>
    </>
  );
};

export default MovieItem_C;
