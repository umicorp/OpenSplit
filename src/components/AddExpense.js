import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import DatePickerValue from './Date';

export const AddExpense = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const {addExpense} = useContext(GlobalContext);
    const onSubmit = e => {
      e.preventDefault();
      const newExpense = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
        date: +DatePickerValue
      }
      addExpense(newExpense)
    }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <input type="text" value={text} onChange={(e) => (setText(e.target.value))} placeholder="Enter a description" />
        </div>
        <div className="form-control">
          <label> </label>
          <input type="number" value={amount} onChange={(e) => (setAmount(e.target.value))} placeholder="0.00" />
        </div>
        <div className="form-control">
        <label> </label>
        {/* <input type="date" value={date} onChange={(e) => (setDate(e.target.value))} placeholder="Enter date of expense..." /> */}
        <DatePickerValue/>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}

