import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";
import { useState } from "react";

const NewExpense = (props) => {
  // 'useState' is a React Hook
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (expenseData) => {
    props.onAddExpenseHandler({
      ...expenseData,
      id: Math.random().toString(),
    });
  };

  const closeFormHandler = () => {
    setIsEditing(false);
  };

  const openFormHandler = () => {
    setIsEditing(true);
  };

  const renderContent = () => {
    if (!isEditing) {
      return (
        <button type="button" onClick={openFormHandler}>
          Add new Expense
        </button>
      );
    }
    return (
      <ExpenseForm
        onSaveExpenseData={saveExpenseDataHandler}
        onClose={closeFormHandler}
      />
    );
  };

  return <div className="new-expense">{renderContent()}</div>;
};

export default NewExpense;
