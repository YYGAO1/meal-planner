"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const dayjs_1 = __importDefault(require("dayjs"));
const day_1 = require("../store/day");
const MealPlanner = () => {
    const { day } = (0, react_redux_1.useSelector)((state) => state);
    const today = (0, dayjs_1.default)().format("YYYY-MM-DD");
    const [date, setDate] = (0, react_1.useState)((0, dayjs_1.default)(today));
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, day_1.fetchDay)((0, dayjs_1.default)(date).format("YYYY-MM-DD")));
    }, [date]);
    const breakfast = [];
    const lunch = [];
    const dinner = [];
    const snacks = [];
    day.meals.map((meal) => {
        if (meal.type === "breakfast") {
            meal.mealrecipes
                .map((mealrecipe) => mealrecipe.recipe)
                .map((recipe) => {
                breakfast.push(recipe);
            });
        }
        if (meal.type === "lunch") {
            meal.mealrecipes
                .map((mealrecipe) => mealrecipe.recipe)
                .map((recipe) => {
                lunch.push(recipe);
            });
        }
        if (meal.type === "dinner") {
            meal.mealrecipes
                .map((mealrecipe) => mealrecipe.recipe)
                .map((recipe) => {
                dinner.push(recipe);
            });
        }
        if (meal.type === "snack") {
            meal.mealrecipes
                .map((mealrecipe) => mealrecipe.recipe)
                .map((recipe) => {
                snacks.push(recipe);
            });
        }
    });
};
exports.default = MealPlanner;
