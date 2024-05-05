import * as React from 'react';
import "../App.css"
import {SimpleBottomNavigation} from "../components/BottomNavigation";
import {Expense} from "../components/Expense";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {GlobalContext} from "../context/GlobalState";

export default function Group() {
    const [group, setGroup] = useState([]);
    const { groupId } = useParams()
    const groupUrl = `http://localhost:3001/api/groups/${groupId}`
    const { expenses } = useContext(GlobalContext);

    useEffect(() => {
        axios.get(groupUrl)
            .then(response => {
                setGroup(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='container'>
            <>
                <h3>{group.name}</h3>
                <ul className="list">
                    {expenses.map(expense => (<Expense key={expense.id} expense={expense}/>))}
                </ul>
            </>
            <SimpleBottomNavigation/>
        </div>

    );

}