import { useForm } from "react-hook-form";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useState, useNavigate } from "react";

const Login = ({
  onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(data));
  },
}) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const [userID, setuserID] = useState("");
  const [userPW, setuserPW] = useState("");

  const changeID = (e) => {
    setuserID(e.target.value);
  };
  const changePW = (e) => {
    setuserPW(e.target.value);
  };

  const check = (id, pw) => {
    if (id === "master" && pw === "master") {
      window.location.replace("/movie");
    }
  };

  return (
    <div className="login">
      <h1>서울 시네마</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="id"
          type="text"
          placeholder="ID"
          value={userID}
          onChange={changeID}
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
        />
        {errors.email && <small role="alert">{errors.email.message}</small>}
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={userPW}
          onChange={changePW}
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
        />
        {errors.password && (
          <small role="alert">{errors.password.message}</small>
        )}
        <Link to="/movie_c">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={check(userID, userPW)}
          >
            로그인
          </button>
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          onClick={check(userID, userPW)}
        >
          관리자 로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
