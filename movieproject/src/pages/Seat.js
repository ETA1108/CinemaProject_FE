import React, { useState, useEffect, useRef } from "react";
import "./Seat.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Seat = () => {
  const location = useLocation();

  const planid = location.state.id;

  const [txs, setTxs] = useState(null);
  const [theater, setTheater] = useState("");

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
        const response = await axios.get("/screening-schedules/" + planid);
        let filteredTxs = [];
        for (let i = 0; i < Object.keys(response.data.seat_map).length; i++) {
          filteredTxs.push(Object.keys(response.data.seat_map)[i]);
        }
        filteredTxs.sort((a, b) =>
          a.substring(0, 1) < b.substring(0, 1)
            ? -1
            : +a.substring(1, a.length) < b.substring(1, b.length)
            ? 0
            : 1
        );
        setTxs(filteredTxs);
        setTheater(response.data.theater.name);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  function SeatItem(txs) {
    let seat = [];
    for (let i = 0; i < txs.length; i++) {
      if (
        [
          4, 16, 24, 36, 44, 56, 64, 76, 84, 96, 104, 116, 124, 136, 144, 156,
          164, 176, 184, 196, 204, 216, 224, 236, 244,
        ].includes(i)
      )
        seat.push(
          <button className="FakeItem">
            <div className="TxID"></div>
          </button>
        );
      seat.push(
        <button className="RealSeatItem">
          <div className="TxID">{txs[i]}</div>
        </button>
      );
    }
    return seat;
  }

  return (
    <div className="Seat">
      <div className="theater">{theater}</div>
      <div className="Screen">SCREEN</div>
      <div className="SeatItem">{SeatItem(txs)}</div>
    </div>
  );
};
export default Seat;
