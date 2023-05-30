import "./Header.scss";
import { HiOutlineTicket } from "react-icons/hi2";
import { BiCameraMovie } from "react-icons/bi";
import { GrPlan } from "react-icons/gr";
import { MdEventSeat, MdOutlinePeopleAlt } from "react-icons/md";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Header = () => {
  return (
    <header className="Header">
      <div className="show-menu">
        <Link to="/movie">
          <button className="name">
            <div>서울 시네마</div>
          </button>
        </Link>
        <hr></hr>
        <nav className="menu">
          <div>
            <BiCameraMovie /> 영화 관리
          </div>

          <div>
            <BsFillArrowDownCircleFill />
          </div>

          <div>
            <GrPlan /> 상영일정 관리
          </div>

          <div>
            <BsFillArrowDownCircleFill />
          </div>

          <div>
            <MdEventSeat /> 좌석 관리
          </div>

          <hr></hr>
          <Link to="/ticket">
            <button className="manage">
              <HiOutlineTicket /> 티켓 관리
            </button>
          </Link>
          <Link to="/customer">
            <button className="manage">
              <MdOutlinePeopleAlt /> 고객 조회
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
