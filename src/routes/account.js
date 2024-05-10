import * as React from 'react';
import "../App.css"
import {SimpleBottomNavigation} from "../components/BottomNavigation";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {GlobalContext} from "../context/GlobalState";
import {FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import './account.css'

export default function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const AccountUrl = `http://localhost:3001/api/users/`
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        axios.get(AccountUrl)
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container">
            <Typography variant="h2">
                Account
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="user-label">Current User</InputLabel>
                <Select
                    labelId="user-label"
                    value={selectedValue}
                    label="Current User"
                    onChange={(e) => setSelectedValue(e.target.value)}
                >
                    {accounts.map((account) => (
                        <MenuItem key={account.id} value={account.name}>
                            {account.name[0].toUpperCase() + account.name.substr(1).toLowerCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>


    );



}