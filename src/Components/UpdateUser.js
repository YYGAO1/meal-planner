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
    navigate(`/users/${auth.id}`);
  };

  return (

    <div
      style={{
        maxWidth: "700px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Edit Account</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            placeholder="username"
            value={account.username || account.facebook_username || ""}
            class="form-control"
            name="username"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            placeholder="password"
            value={account.password || ""}
            name="password"
            onChange={onChange}
            type="password"
          />
        </div>
        <div class="input-group">
          <span class="input-group-text">About</span>
          <textarea
            className="form-control"
            value={account.about || ""}
            name="about"
            onChange={onChange}
          />
        </div>
        <br></br>
        <div
          className="mb-3"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <label className="form-label">Avatar (PNG, JPEG, JPG only)</label>
          <input className="form-control" type="file" ref={ref} />
        </div>

        <button onClick={update}> update </button>
      </form>
    </div>
  );
};

export default UpdateUser;
