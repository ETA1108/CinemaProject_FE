import React from "react";
import TicketItem from "../components/PlanItem";
import "./Ticket_C.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Ticket_C = () => {
  const [customer_id, setCId] = useState("");
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
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
            setCId(res1.data.customers[i].id);
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

  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        const response = await axios.get(
          "/customers/" + customer_id + "/orders"
        );
        let filteredTxs = [];
        for (let i = 0; i < response.data.orders[0].tickets.length; i++) {
          filteredTxs.push(response.data.orders[0].tickets[i]);
          console.log(response.data.orders[0].tickets[i]);
          console.log(response.data.orders[0].tickets[i].id);
        }
        setTxs(filteredTxs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  return (
    <div className="Ticket">
      <div className="PageName">
        <h1>티켓 예매</h1>
      </div>
      <div className="Bar"></div>
      {/*
      <ul className="TxList">
        {txs.map((txs) => (
          <TicketItem txs={txs} key={txs.id} />
        ))}
      </ul>
        */}
      <Link to="/pay_c">
        <button className="gotopay">결제하러 가기</button>
      </Link>
      <Link to="/mypage">
        <button className="gotomypage">장바구니에 담기</button>
      </Link>
    </div>
  );
};

export default Ticket_C;
