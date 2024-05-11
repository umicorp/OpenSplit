import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";
import {observer} from "mobx-react";

export const Groups = observer((props) =>  {
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
        </div>

    );
})