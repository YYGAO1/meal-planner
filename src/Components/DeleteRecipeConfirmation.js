import React, { useState } from "react";
import { deleteInstructions, deleteRecipe, deleteIngredients } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteRecipeConfirmation = ({ recipe, instructions, ingredients }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const confirmDelete = () => {
    deleteR(recipe);
    closeDeleteConfirmation();
  };

  const deleteR = async (recipe) => {
    dispatch(deleteRecipe(recipe));

    ingredients.map((ingredient) => {
      if (ingredient.recipeId === recipe.id) {
        dispatch(deleteIngredients(ingredient));
      }
    });

    instructions.map((instruction) => {
      if (instruction.recipeId === recipe.id) {
        dispatch(deleteInstructions(instruction));
      }
    });

    navigate(`/myrecipes`);
  };

  return (
    <>
      <button
        type="button"
        className="danger"
        onClick={openDeleteConfirmation}
        data-toggle="tooltip"
        title="delete"
        data-placement="left"
        style={{
          position: "absolute",
          top: "100px",
          right: "30%",
          backgroundColor: "transparent",
          color: "#50ba58",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-eraser-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
        </svg>
      </button>

      {/* Confirm Delete Modal */}
      <div
        className="modal"
        style={{ display: showDeleteConfirmation ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Confirm Delete</h4>
              <button
                type="button"
                className="close"
                onClick={closeDeleteConfirmation}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              Are you sure you want to delete this recipe?
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeDeleteConfirmation}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteRecipeConfirmation;
