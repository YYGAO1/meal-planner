import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../store";
const UpdateUser = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const carouselWidth = "50%";
  const [account, setAccount] = useState({
    username: "",
    password: "",
    avatar: "",
    about: "",
  });

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => [
        setAccount((currentVal) => ({
          ...currentVal,
          avatar: reader.result,
        })),
      ]);
    });
  }, [ref]);

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        password: auth.password,
        about: auth.about ? auth.about : "",
        avatar: auth.avatar ? auth.avatar : "",
      });
    }
  }, [auth]);

  const onChange = (ev) => {
    setAccount({ ...account, [ev.target.name]: ev.target.value });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth(account));
    //navigate(`/users/${auth.id}`);
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
        <div className="mb-3">
          <label className="form-label text-secondary" style={{ width: "55%" }}>
            About
            <textarea
              className="form-control bg-danger text-success"
              value={account.about || ""}
              name="about"
              onChange={onChange}
            />
          </label>
        </div>
        <div className="mb-3">
          <label
            className="form-label text-secondary"
            style={{
              width: "55%",
              display: "inline-block",
              padding: "12px 18px",
              cursor: "pointer",
              borderRadius: "5px",
              backgroundColor: "#89bf8e",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ffe6d4",
            }}
          >
            Upload Avatar (PNG, JPEG, JPG only)
            <div className="custom-file">
              <input
                className="form-control custom-file-input bg-danger text-success"
                type="file"
                ref={ref}
                id="inputGroupFile01"
                style={{ display: "none" }}
              />
            </div>
          </label>
          <img src={account.avatar} />
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
