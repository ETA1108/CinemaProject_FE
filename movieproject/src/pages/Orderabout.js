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
  const schedules = location.state.schedules;

  const [txs, setTxs] = useState(null);
  const [method, setMethod] = useState(""); //결제방법
  const [apnum, setApnum] = useState(""); //카드번호
  const [point, setPoint] = useState(""); //보유포인트
  const [usepoint, setUsepoint] = useState(""); //사용할 포인트
  const [orprice, setOrprice] = useState("");
  const [realprice, setRealprice] = useState("");

  const [movieName, setMovieName] = useState("");
  const [ticketrsnum, setTicketrsnum] = useState("");
  const [seatId, setSeatId] = useState("");
  const [seatName, setSeatName] = useState("");
  const [theaterName, setTheaterName] = useState("");

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
        const response = await axios.get(
          "/customers/" + customerid + "/orders"
        );
        for (let i = 0; i < response.data.orders.length; i++) {
          if (response.data.orders[i].id === orderid)
            setTxs(response.data.orders[i]);
        }
        setSeatId(txs.tickets[0].seat_id);
        setMethod(txs.payment.method);
        setApnum(txs.payment.approval_number);
        setOrprice(txs.payment.original_price);
        setRealprice(txs.payment.amount);
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
        const response = await axios.get("/theaters");
        for (let i = 0; i < response.data.theaters.length; i++) {
          for (let j = 0; j < response.data.theaters[i].seats.length; j++) {
            if (response.data.theaters[i].seats[j].id === seatId) {
              setTheaterName(response.data.theaters[i].name);
              setSeatName(response.data.theaters[i].seats[j].name);
              break;
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);
  /*
  useInterval(() => {
    const fetchData = async () => {
      //      setLoading(true);
      try {
        let response;
        for (let i in schedules) {
          response = await axios.get("/screening-schedules/" + schedules[i]);
          if (
            response.data.theater.name === theaterName &&
            response.data.seat_map[seatName]
          ) {
            setMovieName(response.data.movie.name);
            break;
          }
        }
        console.log(movieName);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);
*/
  return (
    <div className="Pay">
      <div className="PageName">
        <h1>주문 내역 - 주문번호: {orderid}</h1>
      </div>
      <div className="Bar"></div>
      <form>
        좌석
        <input disabled={true} id="id" type="text" value={seatName} />
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
      </form>
    </div>
  );
};

export default Orderabout;
