import { v4 as uuid } from "uuid";
import database from "../firebase/firebase";

// synchronous action
// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// asynchronous action
// component call action generator
// action generator returns function
// component dispatches function (?) (redux by default does not allow you to dispatch a function, need thunk middleware)
// function runs (has the ability to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
const addExpense = (expense) => {
  return {
    type: "ADD_EXPENSE",
    expense,
  };
};

// if expenseData is not given, default will be {}
const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    // destructure from expenseData with default values
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    return database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        );
      });
  };
};

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE",
    id,
  };
};

// EDIT_EXPENSE
const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id,
    updates,
  };
};

export { addExpense, startAddExpense, removeExpense, editExpense };
