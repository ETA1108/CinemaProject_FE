import "./Header.scss";
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
        <Link to="/movie">
          <button className="name">
            <h2>서울 시네마</h2>
          </button>
        </Link>
        <hr></hr>
        <nav className="menu">
          <Link to="/movie">
            <button>
              <BiCameraMovie /> 영화 관리
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <Link to="/plan">
            <button>
              <GrPlan /> 상영일정 관리
            </button>
          </Link>
          <div>
            <BsFillArrowDownCircleFill />
          </div>
          <Link to="/seat">
            <button>
              <MdEventSeat /> 좌석 관리
            </button>
          </Link>
          <hr></hr>
          <Link to="/ticket">
            <button>
              <HiOutlineTicket /> 티켓 관리
            </button>
          </Link>
          <Link to="/customer">
            <button>
              <MdOutlinePeopleAlt /> 고객 조회
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
