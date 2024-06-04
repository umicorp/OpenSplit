import * as React from "react";
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
import {UserGroupType, UserType} from "../store/Types";
import ListItemButton from "@mui/material/ListItemButton";

@inject("rootStore")
@observer
export class Groups extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    componentDidMount() {
        const { uiStore, groupStore } = this.props.rootStore;
        uiStore.setHeader("Groups");
    }

    loadGroupExpenses = (groupId: number) => {
        const { groupStore, userStore, uiStore } = this.props.rootStore;
        if (userStore.currentUser == null) {
            uiStore.openGenericSnackbar(`Select a current User via Account icon`);
        } else {
            groupStore.setCurrentGroup(groupId, userStore.currentUser.id);
        }
    }

    displayUsers = (groupId: number) => {
        const { groupStore } = this.props.rootStore;
        const group = groupStore.allGroups.filter((userGroup: UserGroupType) => userGroup.group.id == groupId)
        const users = group[0].users.map((user: UserType) => user?.name.toUpperCase()[0] + user?.name.slice(1))
        return users.join(" / ")
    }


    render(): ReactNode {
        const { groupStore, userStore } = this.props.rootStore;
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                { groupStore.allGroups.length == 0
                    ? <Typography variant="h6">You have no groups. Create some using the + button.</Typography>
                    :
                    <List>
                    {groupStore.allGroups.map((group: UserGroupType, index: number) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    component="a"
                                    onClick={() => groupStore.deleteGroup(group["group"].id)}>

                                <DeleteIcon/>
                                </IconButton>
                            }
                        >
                            <ListItemButton
                                onClick={() => this.loadGroupExpenses(group["group"].id)}
                                component={Link}
                                to={ userStore.currentUser == null ? "/groups" :`/groups/${group["group"].id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={group["group"].name}
                                    secondary={this.displayUsers(group["group"].id)}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                }
                {process.env.NODE_ENV == "production"
                    ? ""
                    : <Button onClick={() => console.log(this.props.rootStore)}>TEST</Button>
                }            </Box>
        );
    }
}