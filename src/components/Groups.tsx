import * as React from "react";
import {ReactNode} from "react";
import {Button} from "@mui/material";
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

    loadGroupExpenses = (id: number) => {
        const { groupStore, userStore } = this.props.rootStore;
        groupStore.setCurrentGroup(id);
        if (userStore.currentUser != null) {
            groupStore.getGroupExpenses(userStore.currentUser.id, id);
        }
    }

    displayUsers = (id:number) => {
        const { userStore } = this.props.rootStore;
        if (userStore.currentUser === null) {
            return "Please select a current user"
        }
    }


    render(): ReactNode {
        const { groupStore } = this.props.rootStore;
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
                                    onClick={() => groupStore.deleteGroup(group.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        >
                            <ListItemButton onClick={() => this.loadGroupExpenses(group.id)} component={Link} to={`/groups/${group.id}`}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={group.name} secondary={this.displayUsers(group.id)} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Button onClick={() => console.log(this.props)}>TEST</Button>
            </Box>
        );
    }
}