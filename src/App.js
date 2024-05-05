import React from "react";
import { Header } from "./components/Header";

import { Balance } from "./components/Balance";
import { ExpenseList } from "./components/ExpenseList";
import { AddExpense } from "./components/AddExpense";
import {SimpleBottomNavigation} from "./components/BottomNavigation"
import { GlobalProvider } from "./context/GlobalState";

import "./App.css";
function App() {
  return (
    <GlobalProvider >
      <Header />
      <div className='container'>
        <Balance />
        <ExpenseList />
        <AddExpense/>
        <SimpleBottomNavigation/>
        </div>

    </GlobalProvider>
  );
}

export default App;