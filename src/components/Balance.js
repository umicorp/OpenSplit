import React, {useContext} from "react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
    const { expenses } = useContext(GlobalContext);
    const amounts = expenses.map(expenses => expenses.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <>
      <h4>Your Balance</h4>
      <h1>{total}</h1>
    </>
  );
};
