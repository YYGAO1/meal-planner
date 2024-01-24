import axios from "axios";

const listItems = (state = [], action) => {
  if (action.type === "SET_LIST_ITEMS") {
    return action.listItems;
  }
  if (action.type === "CREATE_LIST_ITEM") {
    state = [...state, action.listItem];
  }
  if (action.type === "UPDATE_LIST_ITEM") {
    return state.map((item) => {
      if (item.id === action.listItem.id) {
        return action.listItem;
      } else {
        return item;
      }
    });
  }
  if (action.type === "DELETE_LIST_ITEM") {
    return state.filter((li) => li.id !== action.listItem.id);
  }
  return state;
};

export const fetchListItems = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/listitems", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_LIST_ITEMS", listItems: response.data });
    }
  };
};

export const createListItemSpoonacular = (recipe, ingredient, userId) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const seededRecipe = await axios.post("/api/recipes/spoonacular", recipe);
    dispatch({ type: "CREATE_RECIPE", recipe: seededRecipe.data });
    const recipeIngredients = await axios.get(
      `/api/recipes/${seededRecipe.data.id}/ingredients`
    );
    dispatch({
      type: "ADD_TO_ALL_INGREDIENTS",
      ingredients: recipeIngredients.data,
    });

    const targetIngredient = recipeIngredients.data.find((i) => {
      return i.name === ingredient.name;
    });
    const response = await axios.post(
      "/api/listitems",
      { ingredientId: targetIngredient.id, userId },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "CREATE_LIST_ITEM", listItem: response.data });
  };
};

export const createListItem = (listItem) => {
  return async (dispatch) => {
    const response = await axios.post("api/listitems", listItem);
    dispatch({ type: "CREATE_LIST_ITEM", listItem: response.data });
  };
};

export const createCustomListItem = ({ ingredient, userId }) => {
  return async (dispatch) => {
    // const token = window.localStorage.getItem("token");

    const _ingredient = await axios.post("/api/ingredients", ingredient);
    dispatch({ type: "CREATE_INGREDIENT", ingredient: _ingredient.data });
    const item = await axios.post(
      "api/listitems",
      {
        ingredientId: _ingredient.data.id,
        userId: userId,
      }
      // {
      //   headers: {
      //     authorization: token,
      //   },
      // }
    );
    dispatch({ type: "CREATE_LIST_ITEM", listItem: item.data });
  };
};

export const removeListItem = (item) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.delete(`api/listitems/${item.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_LIST_ITEM", listItem: item });
  };
};

export const checkListItem = (item) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/listitems/${item.id}`,
      { ...item, isChecked: true },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({
      type: "UPDATE_LIST_ITEM",
      listItem: response.data,
    });
  };
};

export const uncheckListItem = (item) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/listitems/${item.id}`,
      { ...item, isChecked: false },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({
      type: "UPDATE_LIST_ITEM",
      listItem: response.data,
    });
  };
};

export const updateListItem = (item) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/listitems/${item.id}`, item, {
      headers: {
        authorization: token,
      },
    });
    dispatch({
      type: "UPDATE_LIST_ITEM",
      listItem: response.data,
    });
  };
};

export default listItems;
