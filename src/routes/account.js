import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import './account.css'
import {observer} from "mobx-react";

export const Account = observer((props) =>  {
    const [accounts, setAccounts] = useState([]);
    const AccountUrl = `http://localhost:3001/api/users/`
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        axios.get(AccountUrl)
            .then(response => {
                setAccounts(response.data);
                props.userStore.setUsers(response.data)
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

            <Typography variant="h2">
                MobX
            </Typography>
            <Button onClick={()=> console.log(props)}>TEST</Button>
            <FormControl fullWidth>
                <InputLabel id="user-label">Current User</InputLabel>
                <Select
                    labelId="user-label"
                    value={props.userStore.currentUser}
                    label="Current User"
                    onChange={(e) => props.userStore.setCurrentUser(e.target.value)}
                >
                    {props.userStore.users.map((account) => (
                        <MenuItem key={account.id} value={account.name}>
                            {account.name[0].toUpperCase() + account.name.substr(1).toLowerCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
})