import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
const UpdateUser = () => {
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));

  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        password: auth.password,
      });
    }
  }, [auth]);

  const onChange = (ev) => {
    setAccount({ ...account, [ev.target.name]: ev.target.value });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth(account));
  };

  return (
    <div
      className="container bg-primary"
      style={{
        paddingTop: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        justifyContent: "space-around",
        maxWidth: "700px",
      }}
    >
      <h1 className="text-secondary" style={{ textAlign: "center" }}>
        Edit Profile
      </h1>
      <form>
        <div className="mb-3">
          <label className="form-label text-secondary" style={{ width: "55%" }}>
            Username
            <input
              placeholder="username"
              value={account.username || ""}
              className="form-control bg-danger text-success"
              name="username"
              onChange={onChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label text-secondary" style={{ width: "55%" }}>
            Password
            <input
              className="form-control bg-danger text-success"
              placeholder="password"
              value={account.password || ""}
              name="password"
              onChange={onChange}
              type="password"
            />
          </label>
        </div>
        <button className="btn btn-secondary text-success" onClick={update}>
          {" "}
          Update{" "}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
