import React from "react";
import "./Mypage.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import OrderItem_C from "../components/OrderItem_C";
import { Link, useLocation } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const MypageNM = () => {
  const { state } = useLocation();
  const { mobilenumber } = state;

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
          if (res1.data.customers[i].mobile_number === mobilenumber) {
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
        let filteredTxs = [];
        const response = await axios.get(
          "/customers/" + customer_id + "/orders"
        );
        for (let i = 0; i < response.data.orders.length; i++) {
          filteredTxs.push(response.data.orders[i]);
        }
        filteredTxs.sort((a, b) => (a.id < b.id ? -1 : 1));
        setTxs(filteredTxs);
        console.log(txs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  return (
    <div className="Mypage">
      <div className="PageName">
        <h2>주문 내역</h2>
      </div>
      <div className="Bar"></div>
      <ul className="TxList">
        {txs && txs.map((txs) => <OrderItem_C txs={txs} key={txs.id} />)}
      </ul>
    </div>
  );
};

export default MypageNM;
