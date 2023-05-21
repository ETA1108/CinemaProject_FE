import React, { useState, useEffect, useRef } from "react";
import SeatItem from "../components/SeatItem";
import "./Seat_per.scss";
import axios from "axios";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Seat_C = () => {
  const [txs, setTxs] = useState(null);

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
        const response = await axios.get("/swagger/0");
        let filteredTxs = [];
        for (let i = 0; i < response.data.length; i++) {
          filteredTxs.push(response.data[i]);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Seat">
      <div className="PageName">
        <h1>좌석 선택</h1>
      </div>
      <div className="Bar"></div>
      <div className="Number">6관</div>
      <div className="Screen">SCREEN</div>
      <ul className="TxList">
        {txs.map((txs) => (
          <SeatItem txs={txs} key={txs.index} />
        ))}
      </ul>
      <Link to="/ticket_c">
        <button className="NextButton">
          <BsFillArrowRightCircleFill />
        </button>
      </Link>
    </div>
  );
};
export default Seat_C;
