import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const groupsTest = [
    {
        "id": 1,
        "name": "Morin",
        "createdAt": "2024-05-07T02:02:18.722Z",
        "updatedAt": "2024-05-07T02:02:18.722Z"
    },
    {
        "id": 2,
        "name": "Cruise",
        "createdAt": "2024-05-07T02:02:18.722Z",
        "updatedAt": "2024-05-07T02:02:18.722Z"
    }
]


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function deleteGroup(id) {
    alert(id)
    // useEffect(() => {
    //     axios.delete(`http://localhost:3001/api/groups/${id}`)
    //         .then(response => {
    //             setGroups(response.data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, groups);
}

async function getGroups() {
    try {
        const response = await axios.get("http://localhost:3001/api/groups")
        console.log(response.data)
        return response.data

    } catch (error) {
        console.error(error);
    }
}

export default function Learn() {

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    // const [groups, setGroups] = useState( getGroups());
    const groups = getGroups();


    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
                        Groups
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {groups.map(group => (
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" component="a" onClick={()=>deleteGroup(group.id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    key={group.id}
                                >
                                    <ListItemAvatar >
                                        <Avatar component={Link} to={`/groups/${group.id}`}>
                                            <FolderIcon />
                                        </Avatar >
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={group.name}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={dense}
                            onChange={(event) => setDense(event.target.checked)}
                        />
                    }
                    label="Enable dense"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={secondary}
                            onChange={(event) => setSecondary(event.target.checked)}
                        />
                    }
                    label="Enable secondary text"
                />
            </FormGroup>
        </Box>
    );
}