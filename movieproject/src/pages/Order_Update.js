import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Pay.scss";
import { Link, useLocation } from "react-router-dom";

const Order_Update = () => {
  const location = useLocation();

  const orderid = location.state.id;

  const [customer_id, setCId] = useState("");
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

  const saveInputSeat = (e) => {
    setSeat(e.target.value);
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
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
            setCId(res1.data.customers[i].id);
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
          "/customers/" + customer_id + "/orders"
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

  function onClickUpdate(e) {
    fetch("/screening-schedules", {
      //put으로 바꾸기
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie_id: 0,
        theater_id: 0,
        screening_started_at: 0,
        screening_ended_at: 0,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage";
        alert("상영일정이 수정되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="Pay">
      <div className="PageName">
        <h1>티켓 수정 - 주문번호: {orderid} (좌석 수정만 가능합니다.)</h1>
      </div>
      <div className="Bar"></div>
      <form onSubmit={onClickUpdate}>
        티켓 예매 번호
        <input disabled={true} id="id" type="text" value={ticketrsnum} />
        티켓 가격
        <input disabled={true} id="id" type="text" value={ticketprice} />
        좌석
        <input id="id" type="text" value={seat} onChange={saveInputSeat} />
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
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default Order_Update;
