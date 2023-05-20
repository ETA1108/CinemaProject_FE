import "./Header_C.scss";
import {
  HiOutlineTicket,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";
import { BiCameraMovie } from "react-icons/bi";
import { GrPlan } from "react-icons/gr";
import { MdEventSeat, MdOutlinePeopleAlt } from "react-icons/md";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { BsCreditCard } from "react-icons/bs";

import { Link } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [isOpen, setMenu] = useState(true);

  const toggleMenu = () => {
    setMenu((isOpen) => !isOpen); // on, off
  };

  const arrow = () => {
    if (isOpen) {
      return <HiChevronDoubleLeft />;
    } else {
      return <HiChevronDoubleRight />;
    }
  };

  return (
    <header className="Header">
      <div className={isOpen ? "show-menu" : "hide-menu"}>
        <button
          className="slide"
          variant="contained"
          onClick={() => toggleMenu()}
        >
          {arrow()}
        </button>
        <div className="name">
          <h2>서울시네마</h2>
        </div>
        <hr></hr>
        <nav className="menu">
          <Link to="/movie_c">
            <button>
              <BiCameraMovie /> 영화
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>

          <Link to="/plan_c">
            <button>
              <GrPlan /> 상영일정
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <Link to="/seat_c">
            <button>
              <MdEventSeat /> 좌석
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <Link to="/ticket_c">
            <button>
              <HiOutlineTicket /> 티켓
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <Link to="/pay_c">
            <button>
              <BsCreditCard /> 결제
            </button>
          </Link>
          <Link to="/mypage">
            <button className="mypage">마이 페이지</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
