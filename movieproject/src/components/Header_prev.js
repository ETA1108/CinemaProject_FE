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
        <Link to="/movie_c">
          <button className="name">
            <div>서울 시네마</div>
          </button>
        </Link>
        <hr></hr>
        <nav className="menu">
          <div>
            <BiCameraMovie /> 영화
          </div>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <div>
            <GrPlan /> 상영일정
          </div>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <div>
            <MdEventSeat /> 좌석
          </div>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <div>
            <HiOutlineTicket /> 티켓
          </div>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <div>
            <BsCreditCard /> 결제
          </div>
          <Link to="/mypage">
            <button className="mypage">마이 페이지</button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
