/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial State

const initialState = {
    expenses: [
        // { id: 1, text: 'Internet', amount: -20 },
        // { id: 2, text: 'Uber Eats', amount: -300 },
        // { id: 3, text: 'Dog Food', amount: -10 },
        // { id: 4, text: 'Tickets', amount: -150 },
        // { id: 5, text: 'Pay', amount: 150 }
    ]
};

// Create Context
export const GlobalContext = createContext(initialState);


// Provider component 
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function deleteExpense(id){
        dispatch({
            type: "DELETE_EXPENSE",
            payload: id
    });
    }

    function addExpense(expense){
        dispatch({
            type: "ADD_EXPENSE",
            payload: expense
    });
    }

    return (<GlobalContext.Provider value={{
        expenses: state.expenses,
        deleteExpense,
        addExpense
         }}>
        {children}
        </GlobalContext.Provider>);
       
};


