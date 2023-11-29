import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../store/recipes";

const UploadRecipe = () => {
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    image: "",
    imageURL: "",
    isCocktail: false,
    userId: auth.id,
    groupId: "",
  });
  const [ingredients, setIngredients] = useState([
    { name: "", amount: 0, measurementUnit: "" },
  ]);

  const [instructions, setInstructions] = useState([
    {
      listOrder: "",
      specification: "",
    },
  ]);

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => [
        setRecipe((currentVal) => ({
          ...currentVal,
          image: reader.result,
        })),
      ]);
    });
  }, [ref]);

  const onChangeRecipe = (ev) => {
    setRecipe({
      ...recipe,
      [ev.target.name]: ev.target.value,
    });
  };
  const onChangeIngredients = (ev, idx) => {
    const { name, value } = ev.target;
    const copy = [...ingredients];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setIngredients(copy);
  };

  const onChangeInstructions = (ev, idx) => {
    const { name, value } = ev.target;

    const copy = [...instructions];
    copy[idx] = {
      ...copy[idx],
      [name]: value,
    };
    setInstructions(copy);
  };

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: 0, measurementUnit: "" },
    ]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { listOrder: 1, specification: "" }]);
  };

  const create = async (ev) => {
    ev.preventDefault();
    const newRecipe = await dispatch(
      createRecipe({ recipe, ingredients, instructions })
    );
    navigate(`/recipes/uploaded/${newRecipe.id}`);
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
        Upload Recipe
      </h1>
      <form onSubmit={create}>
        <div style={{ margin: "35px" }}>
          <div className="mb-3">
            <label
              className="form-label text-secondary"
              style={{ width: "55%" }}
            >
              Title
              <input
                className="form-control bg-danger text-success"
                value={recipe.title}
                name="title"
                onChange={onChangeRecipe}
              />
            </label>
          </div>
          <div className="mb-3">
            <label
              className="form-label text-secondary"
              style={{ width: "55%" }}
            >
              Description
              <textarea
                className="form-control bg-danger text-success"
                value={recipe.description}
                name="description"
                onChange={onChangeRecipe}
              />
            </label>
          </div>
        </div>
        <div className="mb-3 row" style={{ margin: "35px" }}>
          <h4 className="text-secondary">Ingredients</h4>
          {ingredients.map((ingredient, idx) => {
            return (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={idx}
              >
                <label className="form-label text-secondary">
                  amount
                  <input
                    className="form-control bg-danger text-success"
                    value={ingredient.amount}
                    name="amount"
                    onChange={(ev) => onChangeIngredients(ev, idx)}
                  />
                </label>
                <label className="form-label text-secondary">
                  measurement unit
                  <input
                    className="form-control bg-danger text-success"
                    value={ingredient.measurementUnit}
                    name="measurementUnit"
                    onChange={(ev) => onChangeIngredients(ev, idx)}
                  />
                </label>
                <label className="form-label text-secondary">
                  name
                  <input
                    className="form-control bg-danger text-success"
                    value={ingredient.name}
                    name="name"
                    onChange={(ev) => onChangeIngredients(ev, idx)}
                  />
                </label>
              </div>
            );
          })}
        </div>
        <button
          onClick={addIngredient}
          type="button"
          className="btn btn-secondary text-success"
        >
          add more
        </button>
        <div className="mb-3 row" style={{ margin: "35px" }}>
          <h4 className="text-secondary">Instructions</h4>
          {instructions.map((instruction, idx) => {
            return (
              <div
                style={{ display: "flex", justifyContent: "space-around" }}
                key={idx}
              >
                <label className="form-label text-secondary">
                  list order
                  <input
                    className="form-control bg-danger text-success"
                    value={(instruction.listOrder = idx + 1)}
                    name="listOrder"
                    onChange={(ev) => onChangeInstructions(ev, idx)}
                  />
                </label>
                <label
                  className="form-label text-secondary"
                  style={{ width: "65%" }}
                >
                  instruction
                  <input
                    className="form-control bg-danger text-success"
                    value={instruction.specification}
                    name="specification"
                    onChange={(ev) => onChangeInstructions(ev, idx)}
                  />
                </label>
              </div>
            );
          })}
        </div>
        <button
          onClick={addInstruction}
          type="button"
          className="btn btn-secondary text-success"
        >
          add more
        </button>
        <div style={{ margin: "35px" }}>
          <h4 className="text-secondary">Image</h4>
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
              Upload Image (PNG, JPEG, JPG only)
              <div className="custom-file">
                <input
                  type="file"
                  className="form-control custom-file-input bg-danger text-success"
                  ref={ref}
                  style={{ display: "none" }}
                />
              </div>
            </label>
            <img src={recipe.image} style={{ maxWidth: "65%" }} />
          </div>
          <div className="mb-3">
            <label
              className="form-label text-secondary"
              style={{ width: "55%" }}
            >
              Or instead, paste image URL here:
              <input
                className="form-control bg-danger text-success"
                value={recipe.imageURL}
                name="imageURL"
                onChange={onChangeRecipe}
              />
            </label>
          </div>
        </div>
        <button
          style={{ margin: "35px" }}
          className="btn btn-secondary text-success"
          type="submit"
        >
          upload
        </button>
      </form>
    </div>
  );
};

export default UploadRecipe;
