import React, { useState, useEffect, useRef } from "react";
import "./Seat.scss";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Seat_C = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const planid = location.state.id;
  const price = location.state.price;

  const [txs, setTxs] = useState(null);
  const [theater, setTheater] = useState("");
  const [seat, setSeat] = useState("");
  const [seatid, setSeatid] = useState("");
  const arr = ["A1", "A3"];
  arr.sort((a, b) =>
    a[0].substring(0, 1) < b[0].substring(0, 1)
      ? -1
      : parseFloat(a[0].substring(1, a.length)) <
        parseFloat(+b[0].substring(1, b.length))
      ? 0
      : 1
  );
  console.log(arr);

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
        let filteredTxs = [];
        for (
          let i = 0;
          i < Object.entries(response.data.seat_map).length;
          i++
        ) {
          filteredTxs.push(Object.entries(response.data.seat_map)[i]);
        }
        filteredTxs.sort((a, b) => {
          if (a[0].substring(0, 1) > b[0].substring(0, 1)) {
            return 1;
          }
          if (a[0].substring(0, 1) < b[0].substring(0, 1)) {
            return -1;
          }
          if (
            +a[0].substring(1, a[0].length) > +b[0].substring(1, b[0].length)
          ) {
            return 1;
          }
          if (
            +a[0].substring(1, a[0].length) < +b[0].substring(1, b[0].length)
          ) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        setTxs(filteredTxs);
        setTheater(response.data.theater.name);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, 500);

  if (!txs) {
    return null;
  }

  function SeatItem(txs) {
    let seat = [];
    for (let i = 0; i < txs.length; i++) {
      if (
        [
          4, 16, 24, 36, 44, 56, 64, 76, 84, 96, 104, 116, 124, 136, 144, 156,
          164, 176, 184, 196, 204, 216, 224, 236, 244,
        ].includes(i)
      )
        seat.push(
          <button className="FakeItem">
            <div className="TxID"></div>
          </button>
        );
      if (txs[i][1]) {
        seat.push(
          <button disabled="disabled" className="CantSeatItem">
            <div className="TxID">{txs[i][0]}</div>
          </button>
        );
      } else {
        seat.push(
          <button
            className="CanSeatItem"
            onClick={(e) => {
              setSeat(txs[i][0]);
              setSeatid(i + 10);
            }}
          >
            <div className="TxID">{txs[i][0]}</div>
          </button>
        );
      }
    }
    return seat;
  }

  function onClickGoTicket(e) {
    if (!sessionStorage.getItem("user_id")) {
      navigate("/ticket_nm", {
        state: { planid: planid, seatname: seat, seatid: seatid, price: price },
      });
    } else {
      navigate("/ticket_c", {
        state: { planid: planid, seatname: seat, seatid: seatid, price: price },
      });
    }
  }

  return (
    <div className="Seat">
      <div className="theater">{theater}</div>
      <div className="Screen">SCREEN</div>
      <div className="SeatItem">{SeatItem(txs)}</div>
      <button onClick={onClickGoTicket} className="gototicket">
        예매하러 가기 →
      </button>
    </div>
  );
};
export default Seat_C;
