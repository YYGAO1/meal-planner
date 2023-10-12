import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
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
          className="bg-danger text-secondary"
          style={{ width: "45%", margin: "5px auto" }}
        />
        <input
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
          className="bg-danger text-secondary"
          style={{ width: "45%", margin: "5px auto" }}
        />
        <button
          className="btn btn-secondary text-primary"
          style={{ width: "100px", margin: "5px auto" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
