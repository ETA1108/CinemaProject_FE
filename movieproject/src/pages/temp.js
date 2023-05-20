import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Join.scss";
import { Link } from "react-router-dom";

const Temp = () => {
  const [inputAd, setInputAd] = useState("");

  const saveInputAd = (e) => {
    setInputAd(e.target.value);
    console.log(inputAd);
  };

  const changeRadioQ1 = (e) => {
    setInputAd(e.target.value);
  };

  return (
    <div>
      <input
        type="radio"
        id="asdf"
        name="asdf"
        value="1"
        checked={inputAd === "1" ? true : false}
        onChange={saveInputAd}
      ></input>
      <input
        type="radio"
        id="asdf2"
        name="asdf2"
        value="0"
        checked={inputAd === "0" ? true : false}
        onChange={saveInputAd}
      ></input>
    </div>
  );
};

export default Temp;
