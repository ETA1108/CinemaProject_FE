import React from "react";
import "./Mypage.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { MdAdUnits } from "react-icons/md";

const Mypage_ud = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [rn, setRn] = useState("");
  const [ad, setAd] = useState("");
  const [pt, setPt] = useState("");
  const [mn, setMn] = useState("");

  const saveInputId = (e) => {
    setId(e.target.value);
  };
  const saveInputPw = (e) => {
    setPw(e.target.value);
  };
  const saveInputNum = (e) => {
    setRn(e.target.value);
  };
  const saveInputAd = (e) => {
    setAd(e.target.value);
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
        const response = await axios.get("/customers/1"); // ${id}/토큰 저장하기
        setId(response.data.user_id);
        setPw(response.data.encrypted_password);
        setRn(response.data.resident_registration_number);
        setAd(response.data.is_verified_adult);
        setPt(response.data.point);
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
        resident_registration_number: rn,
        is_verfied: true,
        is_verified_adult: ad,
        mobile_number: mn,
      }),
    })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        document.location.href = "/mypage";
        alert("회원가입을 축하합니다!");
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
        주민등록번호{" ('-'없이)"}
        <input id="renumber" type="text" value={rn} onChange={saveInputNum} />
        전화번호
        <input id="phonenumber" type="text" value={mn} onChange={saveInputPh} />
        성인 여부{" (만 19세 이상 여부)"}
        <div>
          <input
            type="radio"
            id="isadult"
            value={true}
            checked={ad === true ? true : false}
            onChange={saveInputAd}
          ></input>
          <div className="text">예</div>
          <input
            type="radio"
            id="isadult"
            value={false}
            checked={ad === false ? true : false}
            onChange={saveInputAd}
          ></input>
          <div className="text">아니오</div>
        </div>
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default Mypage_ud;
