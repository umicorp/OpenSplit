import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';
import DatePickerValue from './Date';
import dayjs from 'dayjs';

export const AddExpense = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(null);
    const [person, setPerson] = useState('');
    const {addExpense} = useContext(GlobalContext);


    const onSubmit = e => {
      e.preventDefault();
      const newExpense = {
        id: Math.floor(Math.random() * 100000000),
        text,
        amount: +amount,
        date: date,
        person: person
      }
      addExpense(newExpense)
      clearForm()
    }
    
    const clearForm = () =>{
      setText('');
      setAmount(0);
      setDate(null);
      setPerson('');
    }


    const handleDate = (date) => {
      let d = dayjs(date)
      setDate(d)
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
        <DatePickerValue handleDate={handleDate} date={date} />
        </div>
        <div className="form-control">
          <label> </label>
          <input type="text" value={person} onChange={(e) => (setPerson(e.target.value))} placeholder="Select who paid" />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
} 

