import { v4 as uuid } from "uuid"
import database from "../firebase/firebase"

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
  }
}

// if expenseData is not given, default will be {}
const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    // destructure from expenseData with default values
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData

    const expense = { description, note, amount, createdAt }
    const uid = getState().auth.uid

    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        )
      })
  }
}

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE",
    id,
  }
}

const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }))
      })
  }
}

// EDIT_EXPENSE
const editExpense = (id, updates) => {
  return {
    type: "EDIT_EXPENSE",
    id,
    updates,
  }
}

const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates))
      })
  }
}

// SET_EXPENSES
const setExpenses = (expenses) => {
  return {
    type: "SET_EXPENSES",
    expenses,
  }
}

const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then((snapshot) => {
        const expenses = []

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          })
        })

        dispatch(setExpenses(expenses))
      })
  }
}

export {
  addExpense,
  startAddExpense,
  removeExpense,
  startRemoveExpense,
  editExpense,
  startEditExpense,
  setExpenses,
  startSetExpenses,
}
