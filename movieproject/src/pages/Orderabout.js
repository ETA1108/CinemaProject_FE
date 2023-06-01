import React from "react";
import "./Pay.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link, useLocation } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Orderabout = () => {
  const location = useLocation();

  const customerid = location.state.customerid;
  const orderid = location.state.orderid;
  console.log(orderid);
  console.log(customerid);

  const [txs, setTxs] = useState(null);
  const [method, setMethod] = useState(""); //결제방법
  const [apnum, setApnum] = useState(""); //카드번호
  const [point, setPoint] = useState(""); //보유포인트
  const [usepoint, setUsepoint] = useState(""); //사용할 포인트
  const [orprice, setOrprice] = useState("");
  const [realprice, setRealprice] = useState("");

  const [ticketprice, setTicketprice] = useState("");
  const [ticketrsnum, setTicketrsnum] = useState("");
  const [seat, setSeat] = useState("");

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
            setPoint(res1.data.customers[i].point);
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
          "/customers/" + customerid + "/orders"
        );
        for (let i = 0; i < response.data.orders.length; i++) {
          if (response.data.orders[i].id === orderid)
            setTxs(response.data.orders[i]);
        }
        setTicketrsnum(txs.tickets[0].revervation_number);
        setTicketprice("가격 추가하기");
        setSeat(txs.tickets[0].seat_id);
        setMethod(txs.payment.method);
        setApnum(txs.payment.approval_number);
        setOrprice(txs.payment.original_price);
        setRealprice(txs.payment.amount);
        setUsepoint("포인트추가하기");
        console.log(txs);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  return (
    <div className="Pay">
      <div className="PageName">
        <h1>주문 내역 - 주문번호: {orderid}</h1>
      </div>
      <div className="Bar"></div>
      <form>
        티켓 예매 번호
        <input disabled={true} id="id" type="text" value={ticketrsnum} />
        티켓 가격
        <input disabled={true} id="id" type="text" value={ticketprice} />
        좌석
        <input disabled={true} id="id" type="text" value={seat} />
        <div className="line">
          <hr></hr>
        </div>
        표준 가격
        <input disabled={true} id="id" type="text" value={orprice} />
        판매 가격
        <input disabled={true} id="id" type="text" value={realprice} />
        결제방법
        <input disabled={true} id="id" type="text" value={method} />
        카드번호{" ('-'없이)"}
        <input disabled={true} id="password" type="text" value={apnum} />
        사용한 포인트
        <input disabled={true} id="usepoint" type="text" value={usepoint} />
        최종 결제 금액
        <input
          disabled={true}
          id="final"
          type="text"
          value={"realprice-usepoint"}
        />
      </form>
    </div>
  );
};

export default Orderabout;
