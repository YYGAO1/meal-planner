import React, { useState } from "react";
import dayjs from "dayjs";
import { addToMealPlanner, seedSpoonacularRecipe } from "../store";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";

const AddToMealPlanner = (id) => {
  const types = ["snack", "breakfast", "lunch", "dinner", "dessert", "misc."];
  const today = new Date();
  const [date, setDate] = useState(today);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const [openItems, setOpenItems] = useState([]);

  const handleAccordionClick = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const isAccordionOpen = (id) => openItems.includes(id);

  //add to planner
  const addToPlanner = ({ id, type, date }) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    dispatch(
      addToMealPlanner({
        type,
        date: newDate,
        recipe_id: id,
        userId: auth.id,
      })
    );
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="accordion">
      <form
        className="accordion-item bg-primary"
        style={{ width: "525px", margin: "15px auto" }}
      >
        <h3 className="accordion-header">
          {" "}
          <button
            className={`accordion-button bg-secondary text-primary ${
              isAccordionOpen("collapseOne") ? "" : "collapsed"
            }`}
            type="button"
            onClick={() => handleAccordionClick("collapseOne")}
          >
            Add to Meal Planner
          </button>
        </h3>
        <div
          id="collapseOne"
          style={{
            maxWidth: "75%",
            margin: "auto",
          }}
          className={`accordion-collapse collapse ${
            isAccordionOpen("collapseOne") ? "show" : ""
          }`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <DatePicker
              showIcon
              selected={date}
              className="bg-danger text-success"
              onChange={(newDate) => setDate(newDate)}
            />
            <select
              className="form-select bg-danger text-success"
              style={{ maxWidth: "45%", margin: "10px auto" }}
              aria-label="Default select example"
              value={type}
              label="type"
              onChange={handleChange}
            >
              <option>Type</option>

              {types.map((type) => {
                return (
                  <option
                    className="dropdown-item"
                    type="button"
                    value={type}
                    key={type}
                  >
                    {type}
                  </option>
                );
              })}
            </select>
            <button
              type="button"
              className="btn btn-secondary text-primary"
              style={{ maxWidth: "25%" }}
              onClick={() => addToPlanner({ date, id, type })}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddToMealPlanner;
