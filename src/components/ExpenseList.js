import React, {useContext} from 'react';
import { Expense } from './Expense';
import { GlobalContext } from '../context/GlobalState';

export const ExpenseList = () => {
    const { expenses } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {expenses.map(expense => ( <Expense key={expense.id} expense={expense}/>))}
      </ul>
    </>
  )
}
