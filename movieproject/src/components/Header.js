import "./Header.scss";
import {
  HiOutlineTicket,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi2";
import { BiCameraMovie } from "react-icons/bi";
import { GrPlan } from "react-icons/gr";
import { MdEventSeat, MdOutlinePeopleAlt } from "react-icons/md";
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
          <Link to="/movie" onClick={() => setActiveNav(1)}>
            <button className={activeNav === 1 ? "active" : ""}>
              <BiCameraMovie /> 영화 관리
            </button>
          </Link>
          {/*
          <Link to="/plan" onClick={() => setActiveNav(2)}>
            <button className={activeNav === 2 ? "active" : ""}>
              <GrPlan /> 상영일정 관리
            </button>
          </Link>
  */}
          <Link to="/seat" onClick={() => setActiveNav(3)}>
            <button className={activeNav === 3 ? "active" : ""}>
              <MdEventSeat /> 좌석 관리
            </button>
          </Link>
          <Link to="/ticket" onClick={() => setActiveNav(4)}>
            <button className={activeNav === 4 ? "active" : ""}>
              <HiOutlineTicket /> 티켓 관리
            </button>
          </Link>
          <Link to="/customer" onClick={() => setActiveNav(5)}>
            <button className={activeNav === 5 ? "active" : ""}>
              <MdOutlinePeopleAlt /> 고객 관리
            </button>
          </Link>
          <Link to="/pay" onClick={() => setActiveNav(6)}>
            <button className={activeNav === 6 ? "active" : ""}>
              <BsCreditCard /> 결제 관리
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
