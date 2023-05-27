import React, { useState, useEffect, useRef } from "react";
import "./Seat.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Seat_C = () => {
  const location = useLocation();

  const planid = location.state.id;

  const [txs, setTxs] = useState(null);
  const [seat, setSeat] = useState("");
  const [seatid, setSeatid] = useState("");
  const [activeNav, setActiveNav] = useState(null);

  let seatarray = [];
  let seatidarray = [];

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
        setTxs(filteredTxs.sort());
        console.log(txs);
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
      seat.push(
        <button
          onClick={(e) => {
            setSeat(txs[i]);
            setSeatid(i);
            setActiveNav(i);
          }}
          className={activeNav === i ? "active" : ""}
        >
          <div className="TxID">{txs[i]}</div>
        </button>
      );
    }
    return seat;
  }

  return (
    <div className="Seat">
      <div className="Screen">SCREEN</div>
      <div className="SeatItem">{SeatItem(txs)}</div>
      <Link
        to="/ticket_c"
        state={{ planid: planid, seatid: seatid, seatname: seat }}
      >
        <button className="gototicket">예매하러 가기</button>
      </Link>
    </div>
  );
};
export default Seat_C;
