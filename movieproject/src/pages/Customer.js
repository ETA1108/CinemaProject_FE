import React, { useState, useEffect, useRef } from "react";
import CustomerItem from "../components/CustomerItem";
import "./Customer.scss";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Customer = () => {
  const [txs, setTxs] = useState(null);
  const [inputRRN, setInputRRN] = useState("");
  const [temp, setTemp] = useState("");

  const saveInputRRN = (e) => {
    setInputRRN(e.target.value);
  };

  const onClick = () => {
    setTemp(inputRRN);
  };

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
          if (temp === "") filteredTxs.push(response.data.customers[i]);
          else if (
            response.data.customers[i].resident_registration_number === temp
          )
            filteredTxs.push(response.data.customers[i]);
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
    <div className="Customer">
      <div className="PageName">
        <h1>전체 고객 조회</h1>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        <div className="Filter">
          <input
            className="Category"
            type="text"
            value={inputRRN}
            onChange={saveInputRRN}
          ></input>
          <button onClick={onClick}>
            <BsSearch size="17" />
          </button>
        </div>
        <div></div>
        <div></div>
        {txs.map((txs) => (
          <CustomerItem txs={txs} key={txs.id} />
        ))}
      </ul>
      <Link to="/ticket">
        <button className="gotoplanall">전체 티켓 조회</button>
      </Link>
    </div>
  );
};
export default Customer;
