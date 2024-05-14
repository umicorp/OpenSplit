import * as React from "react";
import {ReactNode} from "react";
import {Button,Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import {ExpenseType} from "../store/Types";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import {Theme} from "../theme/Theme";

@inject("rootStore")
@observer
export class Group extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        const { groupId } = this.props.match.params;
        const { groupStore, userStore } = this.props.rootStore
        groupStore.getGroupExpenses(userStore.currentUser.id, groupId)
    }

    componentDidMount() {
        const { uiStore, groupStore } = this.props.rootStore
        uiStore.setHeader(groupStore.currentGroup.name)
    }

    render(): ReactNode {
        const {groupStore, userStore} = this.props.rootStore;

        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <Box sx={{flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Avatar variant="square" src="/splitwise_logo_2.png"/>
                    {groupStore.userGroupBalance > 0
                        ? (<Typography variant="h6" color={Theme.palette.success.main}>
                            You are owed ${Math.abs(groupStore.userGroupBalance).toFixed(2)}
                        </Typography>)
                        : (<Typography variant="h6" color={Theme.palette.error.main}>
                            You owe ${Math.abs(groupStore.userGroupBalance).toFixed(2)}
                        </Typography>)
                    }
                </Box>
                <List>
                    {groupStore.groupExpenses.map((expense: ExpenseType) => (
                        <ListItem key={expense.id}
                                  sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <ListItemAvatar sx={{flexGrow: 1}}>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                disableTypography={true}
                                primary={<Typography variant={"h4"}>{expense.name}</Typography>}
                                secondary={
                                    <Typography variant={"body1"}>
                                        {expense.paidBy.name[0].toUpperCase() + expense.paidBy.name.substr(1).toLowerCase()} paid
                                        ${expense.totalAmount.toFixed(2)}
                                    </Typography>
                                }
                                sx={{flexGrow: 10}}
                            />
                            <ListItemText
                                disableTypography={true}
                                primary={
                                    <Typography
                                        variant={"body2"}
                                        textAlign={"right"}
                                        color={expense.paidBy.id == userStore.currentUser.id
                                            ? Theme.palette.success.main
                                            : Theme.palette.error.main
                                        }
                                    >
                                        {expense.paidBy.id == userStore.currentUser.id
                                            ? "you are owed"
                                            : "you borrowed"
                                        }
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        variant={"h5"}
                                        textAlign={"right"}
                                        color={expense.paidBy.id == userStore.currentUser.id
                                            ? Theme.palette.success.main
                                            : Theme.palette.error.main
                                        }
                                    >
                                        $ {expense.owed.toFixed(2)}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Button onClick={() => console.log(this.props.rootStore)}>TEST</Button>
            </Box>

        );
    }
}