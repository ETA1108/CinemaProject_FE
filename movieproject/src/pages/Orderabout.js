import React from "react";
import "./Pay.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Orderabout = () => {
  const { state } = useLocation();
  const { orderid } = state;
  const { customerid } = state;

  // 결제 정보
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState(""); //결제방법
  const [apnum, setApnum] = useState(""); //카드번호
  const [orprice, setOrprice] = useState("");
  const [realprice, setRealprice] = useState("");
  const [paidat, setPaidat] = useState(""); //예매일시 or 결제일시
  // 영화
  const [movieName, setMovieName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [seatId, setSeatId] = useState("");
  const [seatName, setSeatName] = useState("");

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
        const response = await axios.get(
          "/customers/" + customerid + "/orders/" + orderid
        );
        setMovieName(response.data.screening_schedule.movie.name);
        setStartTime(response.data.screening_schedule.screening_started_at);
        setEndTime(response.data.screening_schedule.screening_ended_at);
        setSeatId(response.data.tickets[0].seat_id);
        setStatus(response.data.payment.status);
        setMethod(response.data.payment.method);
        setApnum(response.data.payment.approval_number);
        setOrprice(response.data.payment.original_price);
        setRealprice(response.data.payment.amount);
        let timedata = new Date(response.data.payment.paid_at);
        setPaidat(
          new Date(
            timedata.getTime() - 2 * (timedata.getTimezoneOffset() * 60000)
          )
            .toISOString()
            .substring(0, 19)
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  useInterval(() => {
    const fetchData = async () => {
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

  return (
    <div className="Pay">
      <div className="PageName">
        <h1>주문 내역 - 주문번호: {orderid}</h1>
      </div>
      <div className="Bar"></div>
      <form>
        <div className="body">
          <input disabled={true} id="id" type="text" value={movieName} />
          <input
            disabled={true}
            id="phonenumber"
            type="text"
            value={
              startTime.substr(0, 10) +
              " " +
              startTime.substr(11) +
              " ~ " +
              endTime.substr(11)
            }
          />
          <input
            disabled={true}
            id="password"
            type="text"
            value={theaterName + " " + seatName}
          />
        </div>
        표준 가격
        <input disabled={true} id="id" type="text" value={orprice} />
        판매 가격
        <input disabled={true} id="id" type="text" value={realprice} />
        결제 상태
        <input disabled={true} id="id" type="text" value={status} />
        {(() => {
          if (status === "결제완료")
            return (
              <>
                결제 방법
                <input disabled={true} id="id" type="text" value={method} />
                카드 번호{" ('-'없이)"}
                <input
                  disabled={true}
                  id="password"
                  type="text"
                  value={apnum}
                />
              </>
            );
        })()}
        {(() => {
          if (status === "미결제") return "예매 일시";
          else if (status === "결제완료") return "결제 일시";
        })()}
        <input disabled={true} id="final" type="text" value={paidat} />
      </form>
    </div>
  );
};

export default Orderabout;
