"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToMealPlanner = exports.fetchDay = void 0;
const axios_1 = __importDefault(require("axios"));
const day = (state = { meals: [] }, action) => {
  if (action.type === "SET_DAY") {
    return action.day;
  }
  return state;
};
const fetchDay = (date) => {
  return (dispatch) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const token = window.localStorage.getItem("token");
      const response = yield axios_1.default.get(`/api/mealplanner/${date}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_DAY", day: response.data });
    });
};
exports.fetchDay = fetchDay;
const addToMealPlanner = ({ id, type, date }) => {
  return (dispatch) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const token = window.localStorage.getItem("token");
      const response = yield axios_1.default.post(
        `/api/mealplanner/${date}`,
        { recipeId: id, date: date, type: type },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: "SET_DAY", day: response.data });
    });
};
exports.addToMealPlanner = addToMealPlanner;
exports.default = day;
