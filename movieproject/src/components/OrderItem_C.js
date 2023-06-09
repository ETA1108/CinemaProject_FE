import React from "react";
import "./OrderItem.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const OrderItem_C = ({ txs }) => {
  const id = txs.id;
  const status = txs.payment.status;
  const navigate = useNavigate();
  const paystatus = txs.payment.status;
  const [customer_id, setCId] = useState("");

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

  function onClickDelete(e) {
    axios
      .delete("/customers/" + customer_id + "/orders/" + id, {
        //수정
        data: {
          customer_id: customer_id,
          order_id: id,
        },
      })
      .then((res) => {
        // 작업 완료 되면 페이지 이동(새로고침)
        if (paystatus === "미결제")
          alert("해당 티켓은 예매 취소되었고, 결제 금액은 환불됩니다.");
        else if (paystatus === "결제완료")
          alert("해당 티켓(결제 내역)은 삭제되었습니다.");
        document.location.href = "/mypage";
      })
      .catch((error) => {
        console.log(error.response);
      });
    e.preventDefault();
  }

  function onClickOrder(e) {
    console.log(status);
    if (status === "미결제") {
      navigate("/pay_c", {
        state: { orderid: id },
      });
    } else if (status === "결제완료") {
      navigate("/orderabout_c", {
        state: { orderid: id },
      });
    }
  }

  return (
    <li className="OrderListItem">
      <div className="reservenum">전체 주문 번호: {txs.id}</div>
      <div className="info1">결제 여부: {txs.payment.status}</div>
      <div className="info1">표준 가격: {txs.payment.original_price}</div>
      {(() => {
        if (txs.payment.status === "결제완료")
          return (
            <>
              <div className="info1">판매 가격: {txs.payment.amount}</div>
              <div className="info1">결제 방법: {txs.payment.method}</div>
              <div className="info1">
                카드 번호: {txs.payment.approval_number}
              </div>
            </>
          );
      })()}
      <div className="info1">
        {(() => {
          if (txs.payment.status === "미결제") return "예매 일시";
          else if (txs.payment.status === "결제완료") return "결제 일시";
        })()}
        : {txs.payment.paid_at}
      </div>
      <button className="gotoplan" onClick={onClickOrder}>
        자세히 보기
      </button>
      <button className="ticketdelete" onClick={onClickDelete}>
        티켓{" "}
        {(() => {
          if (txs.payment.status === "미결제") return "취소하기";
          else if (txs.payment.status === "결제완료") return "삭제하기";
        })()}
      </button>
    </li>
  );
};

export default OrderItem_C;
