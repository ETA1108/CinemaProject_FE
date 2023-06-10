import React from "react";
import "./Ticket_C.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";
import { set } from "react-hook-form";

const TicketNM = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const planid = location.state.planid;
  const seatid = location.state.seatid;
  const seatname = location.state.seatname;
  const price = location.state.price;
  let inputAd = "";

  const date = new Date().toISOString();

  const [inputName, setInputName] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [inputThid, setInputThid] = useState("");
  const [inputThname, setInputThname] = useState("");
  const [inputStart, setInputStart] = useState("");
  const [inputEnd, setInputEnd] = useState("");
  const [inputRate, setInputRate] = useState("");
  const [inputNum, setInputNum] = useState("");
  const [inputPh, setInputPh] = useState("");

  const saveInputNum = (e) => {
    setInputNum(e.target.value);
  };

  const saveInputPh = (e) => {
    setInputPh(e.target.value);
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
        const response = await axios.get("/screening-schedules/" + planid);
        setInputName(response.data.movie.name);
        setInputTime(response.data.movie.running_time);
        setInputRate(response.data.movie.rating);
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

  let seatarray = [];
  for (let i = 0; i < 3; i++) {
    let dataset = {
      id: i,
    };
    seatarray.push(JSON.stringify(dataset));
  }
  console.log(seatarray);

  function onClickJoin(e) {
    if (!isadult(inputNum) && inputRate === "청소년 관람불가") {
      alert("미성년자는 청소년 관람불가 영화를 보실 수 없습니다.");
    } else {
      fetch("/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resident_registration_number: inputNum,
          point: 0,
          mobile_number: inputPh,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          sessionStorage.setItem("user_id", response.user_id);
          onClickMakeTicket(response.id);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    e.preventDefault();
  }

  function onClickMakeTicket(cid) {
    fetch("/customers/" + cid + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Content-Type을 반드시 이렇게 하여야 한다.
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
        navigate("/pay_c", {
          state: { seatid: seatid, seatname: seatname, orderid: response.id },
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  function isadult(num) {
    const year = num.substr(0, 2);
    const realyear = year > 23 ? "19" + year : "20" + year;
    if (realyear > 2004) {
      inputAd = false;
    } else if (realyear <= 2004) {
      inputAd = true;
    }
  }

  return (
    <div className="Ticket">
      <div className="PageName">
        <h1>티켓 예매</h1>
      </div>
      <div className="Bar"></div>
      <form onSubmit={onClickJoin}>
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
            <button>결제하러 가기</button>
          </div>
          <div className="intro">
            * 티켓 예매를 위해 필수 개인 정보를 입력해주세요.
          </div>
          주민등록번호
          {" ('-'없이): "}
          <input
            id="customer"
            type="text"
            value={inputNum}
            onChange={saveInputNum}
          />
          <br></br>
          전화번호{" ('-'없이): "}
          <input
            id="customer"
            type="text"
            value={inputPh}
            onChange={saveInputPh}
          />
        </div>
      </form>
    </div>
  );
};

export default TicketNM;
