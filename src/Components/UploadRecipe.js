import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../store/recipes";

const UploadRecipe = () => {
  const { auth, groups, memberships } = useSelector((state) => state);
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
    navigate(`/recipes/details/${newRecipe.id}`);
  };

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        display: "grid",
        gridtemplaterows: "1fr auto",
      }}
    >
      ,
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "120px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Upload Recipe</h2>
          <form onSubmit={create}>
            <input
              className="form-control"
              placeholder="title"
              value={recipe.title}
              name="title"
              onChange={onChangeRecipe}
            />
            <textarea
              className="form-control"
              placeholder="description"
              value={recipe.description}
              name="description"
              onChange={onChangeRecipe}
            />
            <div className="mb-3 row">
              <h4>Ingredients</h4>
              {ingredients.map((ingredient, idx) => {
                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    key={idx}
                  >
                    <input
                      className="form-control"
                      placeholder={`amount`}
                      value={ingredient.amount}
                      name="amount"
                      onChange={(ev) => onChangeIngredients(ev, idx)}
                    />
                    <input
                      className="form-control"
                      placeholder={`name`}
                      value={ingredient.name}
                      name="name"
                      onChange={(ev) => onChangeIngredients(ev, idx)}
                    />
                    <input
                      className="form-control"
                      placeholder={`measurement unit`}
                      value={ingredient.measurementUnit}
                      name="measurementUnit"
                      onChange={(ev) => onChangeIngredients(ev, idx)}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={addIngredient} type="button">
              add more
            </button>
            <div className="mb-3 row">
              <h4>Instructions</h4>
              {instructions.map((instruction, idx) => {
                return (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    key={idx}
                  >
                    <input
                      className="form-control"
                      placeholder="list order"
                      value={(instruction.listOrder = idx + 1)}
                      name="listOrder"
                      onChange={(ev) => onChangeInstructions(ev, idx)}
                    />
                    <input
                      className="form-control"
                      placeholder="instruction"
                      value={instruction.specification}
                      name="specification"
                      onChange={(ev) => onChangeInstructions(ev, idx)}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={addInstruction} type="button">
              add more
            </button>
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              className="mb-3 row"
            >
              <label>Image (PNG, JPEG, JPG only)</label>
              <input type="file" ref={ref} />
            </div>
            <input
              className="form-control"
              placeholder="image URL"
              value={recipe.imageURL}
              name="imageURL"
              onChange={onChangeRecipe}
            />

            <button type="submit">upload</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadRecipe;
