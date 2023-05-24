import React, { useState, useEffect, useRef } from "react";
import CustomerItem from "../components/CustomerItem";
import "./Customer.scss";
import axios from "axios";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

const Customer = () => {
  const [txs, setTxs] = useState(null);
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
        const response = await axios.get("/customers");
        let filteredTxs = [];
        for (let i = 0; i < response.data.customers.length; i++) {
          filteredTxs.push(response.data.customers[i]);
        }
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
    <div className="Customer">
      <div className="PageName">
        <h1>전체 고객 조회</h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs.map((txs) => (
          <CustomerItem txs={txs} key={txs.id} />
        ))}
      </ul>
    </div>
  );
};
export default Customer;
