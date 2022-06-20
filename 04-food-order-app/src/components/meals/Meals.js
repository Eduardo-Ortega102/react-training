import MealsSummary from "./meals-summary/MealsSummary";
import AvailableMeals from "./available-meals/AvailableMeals";
import { Fragment } from "react";

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
