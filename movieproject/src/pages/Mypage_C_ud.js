import React from "react";
import "./Mypage.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Mypage_ud = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [mn, setMn] = useState("");
  const [customer_id, setCId] = useState("");

  const saveInputId = (e) => {
    setId(e.target.value);
  };
  const saveInputPw = (e) => {
    setPw(e.target.value);
  };
  const saveInputPh = (e) => {
    setMn(e.target.value);
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
        const response = await axios.get("/customers/" + customer_id);
        setId(response.data.user_id);
        setPw(response.data.encrypted_password);
        setMn(response.data.mobile_number);
      } catch (e) {
        console.log(e);
      }
      //      setLoading(false);
    };
    fetchData();
  }, 500);

  function onClickUpdate(e) {
    fetch("/customers", {
      //put으로 바꾸기
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
        encrypted_password: pw,
        mobile_number: mn,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        sessionStorage.setItem("user_id", id);
        document.location.href = "/mypage";
        alert("수정되었습니다.");
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  return (
    <div className="join">
      <h1 style={{ textAlign: "center" }}>개인정보 수정</h1>
      <form onSubmit={onClickUpdate}>
        ID
        <input id="id" type="text" value={id} onChange={saveInputId} />
        비밀번호
        <input
          id="password"
          type="password"
          value={pw}
          onChange={saveInputPw}
        />
        전화번호
        <input id="phonenumber" type="text" value={mn} onChange={saveInputPh} />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default Mypage_ud;
