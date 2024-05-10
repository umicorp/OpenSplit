import * as React from 'react';
import "../App.css"
import {SimpleBottomNavigation} from "../components/BottomNavigation";
import {Expense} from "../components/Expense";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {GlobalContext} from "../context/GlobalState";


export default function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const { groupId } = useParams()
    const ExpenseUrl = `http://localhost:3001/api/expense/`
    // let sign = expense.amount < 0 ? "-" : "+";



    useEffect(() => {
        axios.get(ExpenseUrl,{
            params: {
                userid: 1,
                groupid: groupId,
            }
        })
            .then(response => {
                setExpenses(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    console.log(expenses);

    return (
        <ul className="list">
            {expenses.map(expense => (
                <li className={"list"} key={expense.id}><a>{expense.paidby.name} is
            owed {expense.owed} {expense.name}</a></li>
            ))}
        </ul>
    );
}