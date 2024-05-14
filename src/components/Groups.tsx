import * as React from 'react';
import {ReactNode} from "react";
import {Button, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {Link} from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {GroupType} from "../store/Types";
import ListItemButton from "@mui/material/ListItemButton";

@inject("rootStore")
@observer
export class Groups extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    componentDidMount() {
        const { uiStore } = this.props.rootStore
        uiStore.setHeader("Groups")
    }

    render(): ReactNode {
        const { groupStore } = this.props.rootStore
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <List>
                    {groupStore.allGroups.map((group: GroupType) => (
                        <ListItem
                            key={group.id}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    component="a"
                                    onClick={() => alert(group.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        >
                            <ListItemButton component={Link} to={`/groups/${group.id}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={group.name} />
                            </ListItemButton>
                        </ListItem>
                        // <ListItem
                        //     secondaryAction={
                        //         <IconButton
                        //             edge="end"
                        //             aria-label="delete"
                        //             component="a"
                        //             onClick={() => alert(group.id)}>
                        //             <DeleteIcon/>
                        //         </IconButton>
                        //     }
                        //     key={group.id}
                        // >
                        //     <ListItemAvatar>
                        //         <Avatar component={Link} to={`/groups/${group.id}`}>
                        //             <FolderIcon/>
                        //         </Avatar>
                        //     </ListItemAvatar>
                        //     <ListItemText
                        //         primary={group.name}
                        //     />
                        // </ListItem>
                    ))}
                </List>
                <Button onClick={() => console.log(this.props)}>TEST</Button>
            </Box>
        );
    }
}