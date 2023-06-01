import React, { useState, useEffect, useRef } from "react";
import OrderItem from "../components/OrderItem";
import "./Ticket.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

const Ticket = () => {
  const [txs, setTxs] = useState(null);

  const [customer, setCustomer] = useState(null);

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
        let filteredId = [];
        for (let i = 0; i < res1.data.customers.length; i++) {
          filteredId.push(res1.data.customers[i].id);
        }
        setCustomer(filteredId);
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
        for (let j = 0; j < customer.length; j++) {
          let response = await axios.get(
            "/customers/" + customer[j] + "/orders"
          );
          for (let i = 0; i < response.data.orders.length; i++) {
            filteredTxs.push(response.data.orders[i]);
          }
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
        <h1>전체 티켓 조회</h1>
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
export default Ticket;
