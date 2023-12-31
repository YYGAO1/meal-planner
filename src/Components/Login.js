import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
  };

  return (
    <div
      className="container bg-primary"
      style={{
        paddingTop: "35px",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-secondary">Login</h2>
      <form
        onSubmit={login}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          justifyContent: "space-around",
        }}
      >
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
          className="bg-danger text-success"
          style={{ width: "45%", margin: "5px auto" }}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          className="bg-danger text-success"
          style={{ width: "45%", margin: "5px auto" }}
        />
        <div>
          <button
            className="btn btn-secondary text-primary"
            type="submit"
            style={{ width: "100px", margin: "10px" }}
          >
            Login
          </button>
          <button
            className="btn btn-secondary text-primary"
            type="button"
            style={{ width: "100px", margin: "10px" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className="btn btn-secondary text-primary"
            type="button"
            onClick={() =>
              dispatch(attemptLogin({ username: "moe", password: "123" }))
            }
            style={{ width: "100px", margin: "10px" }}
          >
            Demo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
