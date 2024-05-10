import * as React from 'react';
import { styled } from '@mui/material/styles';
import "../App.css"
import {SimpleBottomNavigation} from "../components/BottomNavigation";
import {Expense} from "../components/Expense";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalState";
import axios from "axios";
import {Typography} from "@mui/material";

export default function Groups() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/groups")
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='container'>
            <Typography variant="h2">
                Groups
            </Typography>
            <>
                <ul className="list">
                    {groups.map(group => (
                        <li key={group.id} ><a href={`/groups/${group.id}`}>{group.name}</a></li>
                    ))}
                </ul>
            </>
            {/*<SimpleBottomNavigation/>*/}
        </div>

    );

}