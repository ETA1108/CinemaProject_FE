import React from "react";
import TicketItem from "../components/TicketItem";
import "./Pay.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link, useLocation } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Pay_C = () => {
  const { state } = useLocation();
  const { orderid } = state;
  console.log(orderid);
  //const {seatname} = state;

  const [customer_id, setCId] = useState("");
  const [customer_pw, setCPw] = useState("");
  const [customer_mn, setCMn] = useState("");

  const [txs, setTxs] = useState(null);
  const [method, setMethod] = useState(""); //결제방법
  const [apnum, setApnum] = useState(""); //카드번호
  const [point, setPoint] = useState(""); //보유포인트
  const [usepoint, setUsepoint] = useState(""); //사용할 포인트
  const [orprice, setOrprice] = useState("");
  const [realprice, setRealprice] = useState("");

  //const [ticketprice, setTicketprice] = useState("");
  const [ticketrsnum, setTicketrsnum] = useState("");
  const [seat, setSeat] = useState("");

  const saveInputId = (e) => {
    setMethod(e.target.value);
  };
  const saveInputPw = (e) => {
    setApnum(e.target.value);
  };
  const saveInputPoint = (e) => {
    setUsepoint(e.target.value);
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
            setCPw(res1.data.customers[i].password);
            setCMn(res1.data.customers[i].mobile_number);
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
        setSeat(txs.tickets[0].seat_id);
        setOrprice(txs.payment.original_price);
        setRealprice(txs.payment.amount);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function onClickPay(e) {
    fetch("/customers/" + customer_id + "/orders/" + orderid + "/payment", {
      //put으로 바꾸기
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //payment에 싸서 보내기
        status: "결제완료",
        approval_number: apnum,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
      })
      .catch((error) => {
        console.log(error.response);
      });

    axios
      .patch("/customers/" + customer_id, {
        user_id: sessionStorage.getItem("user_id"),
        password: customer_pw,
        mobile_number: customer_mn,
        point: point + realprice * 0.1 - usepoint,
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage";
        alert("결제 완료되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });

    e.preventDefault();
  }

  return (
    <div className="Pay">
      <div className="PageName">
        <h1>티켓 결제</h1>
      </div>
      <div className="Bar"></div>
      <form onSubmit={onClickPay}>
        티켓 예매 번호
        <input disabled={true} id="id" type="text" value={ticketrsnum} />
        좌석
        <input disabled={true} id="id" type="text" value={seat} />
        <div className="line">
          <hr></hr>
        </div>
        표준 가격
        <input disabled={true} id="id" type="text" value={orprice} />
        판매 가격
        <input disabled={true} id="id" type="text" value={realprice} />
        결제방법 (신용카드 / 계좌이체 / 무통장입금)
        <input id="id" type="text" value={method} onChange={saveInputId} />
        카드번호{" ('-'없이)"}
        <input id="password" type="text" value={apnum} onChange={saveInputPw} />
        보유 포인트 (결제 시 티켓 판매 가격의 10%가 적립됩니다.)
        <input disabled={true} id="phonenumber" type="text" value={point} />
        사용할 포인트
        <input
          id="usepoint"
          type="text"
          value={usepoint}
          onChange={saveInputPoint}
        />
        최종 결제 금액
        <input
          disabled={true}
          id="final"
          type="text"
          value={realprice - usepoint}
        />
        <button className="pay" type="submit">
          결제하기
        </button>
      </form>
    </div>
  );
};

export default Pay_C;
