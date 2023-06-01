import React, { useState, useEffect, useRef } from "react";
import OrderItem from "../components/OrderItem";
import "./Ticket.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Customer_Order = () => {
  const [txs, setTxs] = useState(null);

  const [customername, setCustomername] = useState(null);

  const location = useLocation();

  const customerid = location.state.id;

  //  const [loading, setLoading] = useState(false);

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
          if (res1.data.customers[i].id === customerid) {
            setCustomername(res1.data.customers[i].user_id);
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
        let filteredTxs = [];
        const response = await axios.get(
          "/customers/" + customerid + "/orders"
        );
        for (let i = 0; i < response.data.orders.length; i++) {
          filteredTxs.push(response.data.orders[i]);
        }
        filteredTxs.sort((a, b) => (a.id < b.id ? -1 : 1));
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
    <div className="Ticket_All">
      <div className="PageName">
        <h1>티켓 조회 - {customername}</h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs.map((txs) => (
          <OrderItem txs={txs} key={txs.id} />
        ))}
      </ul>
    </div>
  );
};
export default Customer_Order;
