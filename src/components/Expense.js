import React, {useContext} from 'react';
import dayjs from 'dayjs';
import { GlobalContext } from '../context/GlobalState';

export const Expense = ({expense}) => {
  const {deleteExpense} = useContext(GlobalContext);
  const sign = expense.amount < 0 ? '-' : '+';

  const day = dayjs(expense.date).format("DD")
  const month = dayjs(expense.date).format("MMM")

  return (
    <li className={expense.amount < 0 ? 'minus expense' : 'plus expense'}>
      <div className='date'>
        <div>{month}</div>
        <div>{day}</div>
      </div>
      {/*Add icon here  */}
      <div className='date'>
        <div>{expense.text}</div>
        <div>You owe Sheena $10</div>
      </div>
      <span>{sign}${Math.abs(expense.amount)}</span>
      <button onClick={() => deleteExpense(expense.id)} className="delete-btn">x</button>
    </li>
  )
}

