import React from "react";
import "./Ticket_C.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Ticket_C = () => {
  const location = useLocation();

  const planid = location.state.planid;
  const seatid = location.state.seatid;
  const [customer_id, setCId] = useState("");

  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
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
      //      setLoading(true);
      try {
        const res1 = await axios.get("/customers");
        for (let i = 0; i < res1.data.customers.length; i++) {
          if (
            res1.data.customers[i].user_id === sessionStorage.getItem("user_id")
          ) {
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
        const response = await axios.get("/screening-schedules/" + planid);
        setInputName(response.data.movie.name);
        setInputTime(response.data.movie.running_time);
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
                id: 0,
              },
            ],
          },
        },
        payment: {
          method: "string",
          status: "string",
          approval_number: "string",
          original_price: 10000,
          amount: 10000,
          paid_at: "2023-05-25T17:28:47.065Z",
        },
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        if (window.confirm("장바구니에 담겼습니다. 바로 결제하시겠습니까?")) {
          //true는 확인버튼을 눌렀을 때 코드 작성
          document.location.href = "/pay_c";
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
        영화명
        <input disabled={true} id="id" type="text" value={inputName} />
        상영관
        <input disabled={true} id="password" type="text" value={inputThname} />
        상영 시작시간
        <input
          disabled={true}
          id="phonenumber"
          type="text"
          value={inputStart}
        />
        상영 종료시간
        <input disabled={true} id="renumber" type="text" value={inputEnd} />
        상영시간
        <input disabled={true} id="renumber" type="text" value={inputTime} />
        좌석
        <input disabled={true} id="point" type="text" value={seatid} />
        <button className="intostorage">장바구니에 담기</button>
      </form>
    </div>
  );
};

export default Ticket_C;
