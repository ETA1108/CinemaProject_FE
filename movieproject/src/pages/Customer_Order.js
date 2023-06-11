import React, { useState, useEffect, useRef } from "react";
import OrderItem from "../components/OrderItem";
import "./Movie.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Customer_Order = () => {
  const location = useLocation();

  const customerid = location.state.id;
  const [txs, setTxs] = useState(null);
  const [customername, setCustomername] = useState("");

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
      try {
        const res1 = await axios.get("/customers/" + customerid);
        if (res1.data.is_verified === true) {
          setCustomername(" - " + res1.data.user_id + "님");
        } else {
          setCustomername("");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  useInterval(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  return (
    <div className="Plan">
      <div className="PageName">
        <h1>티켓 조회{customername}</h1>
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
