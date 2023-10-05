"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const dayjs = __importStar(require("dayjs"));
const day_1 = require("../store/day");
require("react-datepicker/dist/react-datepicker.css");
const MealPlanner = () => {
    const { day } = (0, react_redux_1.useSelector)((state) => state);
    const today = dayjs().format("YYYY-MM-DD");
    const [date, setDate] = (0, react_1.useState)(dayjs(today));
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        dispatch((0, day_1.fetchDay)(dayjs(date).format("YYYY-MM-DD")));
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
    return className = "mealPlannerCalendar" >
        // calendar
        showIcon;
    selected = { date };
    onSelect = { handleDateSelect }; //when day is clicked
    onChange = { handleDateChange } //only when value has changed
        /  >
        /div>;
};
;
;
exports.default = MealPlanner;
