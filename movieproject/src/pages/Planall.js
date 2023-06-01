import React, { useState, useEffect, useRef } from "react";
import PlanAllItem from "../components/PlanAllItem";
import "./Plan.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Planall = () => {
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
        const response = await axios.get("/screening-schedules");
        let filteredTxs = [];
        for (let i = 0; i < response.data.screening_schedules.length; i++) {
          filteredTxs.push(response.data.screening_schedules[i]);
        }
        filteredTxs.sort((a, b) =>
          a.screening_started_at < b.screening_started_at ? -1 : 1
        );
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Plan">
      <div className="PageName">
        <h1>전체 상영일정</h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs && txs.map((txs) => <PlanAllItem txs={txs} key={txs.id} />)}
      </ul>
    </div>
  );
};
export default Planall;
