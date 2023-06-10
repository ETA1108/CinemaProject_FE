import React, { useState, useEffect, useRef } from "react";
import PlanAllItem from "../components/PlanAllItem";
import "./Plan.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

const Planall = () => {
  const category = [
    // 장르, 등급 조회
    { id: 0, name: "전체", state: null },
    { id: 1, name: "1관", state: "1관" },
    { id: 2, name: "2관", state: "2관" },
    { id: 3, name: "3관", state: "3관" },
    { id: 4, name: "4관", state: "4관" },
    { id: 5, name: "5관", state: "5관" },
    { id: 6, name: "6관", state: "6관" },
    { id: 7, name: "7관", state: "7관" },
    { id: 8, name: "8관", state: "8관" },
  ];

  const [categoryItem, setCategoryItem] = useState(category[0]);
  const onChange = (id) => {
    setCategoryItem(category[id]);
  };

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
          if (categoryItem.state === null)
            filteredTxs.push(response.data.screening_schedules[i]);
          else if (
            response.data.screening_schedules[i].theater.name ===
            categoryItem.state
          )
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
      <div className="select-dropdown">
        {category.map((cate) => (
          <div
            className={(() => {
              if (cate.name === categoryItem.name)
                return "select-item selected";
              else return "select-item";
            })()}
            key={cate.id}
            onClick={() => onChange(cate.id)}
          >
            &nbsp; <div>{cate.name}</div>
          </div>
        ))}
      </div>
      <ul className="TxList">
        {txs && txs.map((txs) => <PlanAllItem txs={txs} key={txs.id} />)}
      </ul>
    </div>
  );
};
export default Planall;
