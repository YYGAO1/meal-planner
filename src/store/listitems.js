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

export const createListItem = (listItem) => {
  return async (dispatch) => {
    const response = await axios.post("api/listitems", listItem);
    dispatch({ type: "CREATE_LIST_ITEM", listItem: response.data });
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

export default listItems;
