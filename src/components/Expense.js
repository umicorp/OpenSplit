import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Expense = ({expense}) => {
  const {deleteExpense} = useContext(GlobalContext);
  const sign = expense.amount < 0 ? '-' : '+';
  return (
    <li className={expense.amount < 0 ? 'minus' : 'plus'}>
          {expense.text} <span>{sign}${Math.abs(expense.amount)} {expense.date}</span><button onClick={() => deleteExpense(expense.id)} className="delete-btn">x</button>
        </li>
  )
}

