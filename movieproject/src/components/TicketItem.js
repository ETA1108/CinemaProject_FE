import React from "react";
import "./TicketItem.scss";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const TicketItem = ({ txs }) => {
  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputThid, setInputThid] = useState("");
  const [inputThname, setInputThname] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

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
  /*
  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get("/screening-schedules/" + planid);
        setInputName(response.data.movie.name);
        setInputTime(response.data.movie.running_time);
        setInputThid(response.data.theater.id);
        setInputThname(response.data.theater.name);
        setInputStart(response.data.screening_started_at);
        setInputEnd(response.data.screening_ended_at);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);
*/

  return (
    <li className="TicketListItem">
      <div className="reservenum">예매 번호: {txs.reservation_number}</div>
      <div className="info1">
        가격: {"가격 추가"}
        좌석: {"좌석 추가"}
      </div>
    </li>
  );
};

export default TicketItem;
