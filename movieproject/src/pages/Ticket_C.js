import React from "react";
import "./Ticket.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Ticket_C = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { planid } = state;
  const { seatid } = state;
  const { seatname } = state;
  const { price } = state;

  const date = new Date().toISOString();

  const [customer_id, setCId] = useState("");

  const [inputName, setInputName] = useState("");
  const [inputThid, setInputThid] = useState("");
  const [inputThname, setInputThname] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");

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
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
            setCId(res1.data.customers[i].id);
            break;
          }
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
        const response = await axios.get("/screening-schedules/" + planid);
        setInputName(response.data.movie.name);
        setInputThid(response.data.theater.id);
        setInputThname(response.data.theater.name);
        setInputStart(response.data.screening_started_at);
        setInputEnd(response.data.screening_ended_at);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  function onClickMakeTicket(e) {
    fetch("/customers/" + customer_id + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        screening_schedule: {
          id: planid,
          theater: {
            id: +inputThid,
            seats: [
              {
                id: +seatid,
              },
            ],
          },
        },
        payment: {
          method: "신용카드",
          status: "미결제",
          approval_number: "-",
          original_price: price,
          amount: price,
          point: 0,
          paid_at: date,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        if (window.confirm("장바구니에 담겼습니다. 바로 결제하시겠습니까?")) {
          //true는 확인버튼을 눌렀을 때 코드 작성

          navigate("/pay_c", {
            state: { seatid: seatid, seatname: seatname, orderid: response.id },
          });
        } else {
          // false는 취소버튼을 눌렀을 때, 취소됨
          document.location.href = "/mypage";
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  return (
    <div className="Ticket">
      <div className="PageName">
        <h1>티켓 예매</h1>
      </div>
      <div className="Bar"></div>
      <form onSubmit={onClickMakeTicket}>
        <div className="body">
          <div className="info">
            <input disabled={true} id="id" type="text" value={inputName} />
            <input
              disabled={true}
              id="phonenumber"
              type="text"
              value={
                inputStart.substr(0, 10) +
                " " +
                inputStart.substr(11) +
                " ~ " +
                inputEnd.substr(11)
              }
            />
            <input
              disabled={true}
              id="password"
              type="text"
              value={inputThname + " " + seatname}
            />
          </div>
          <div className="intostorage">
            <button>장바구니에 담기</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ticket_C;
