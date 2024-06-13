import * as React from "react";
import {ReactNode} from "react";
import {ListItemButton, Paper, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import {ExpenseType} from "../store/Types";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Theme} from "../theme/Theme";
import {delay, uppercaseName} from "../helpers/Common";
import PullToRefresh from "react-simple-pull-to-refresh";
import {DateChip} from "./DateChip";

@inject("rootStore")
@observer
export class ExpenseList extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            ExpenseToDelete: null,
        };
    }

    displaySecondaryText = (expense: ExpenseType): string => {
        if (expense.settleUp) {
            const {groupStore} = this.props.rootStore;
            const usersInGroup = groupStore.currentGroupUsers;
            const usersToBePaid: string[] = [];
            for (const user of usersInGroup) {
                if (expense.paidBy.id != user.id) {
                    usersToBePaid.push(uppercaseName(user.name));
                }
            }
            const display = `${uppercaseName(expense.paidBy.name)} paid \n ${usersToBePaid}`;
            return display;
        } else {
            const display = `${uppercaseName(expense.paidBy.name)} paid \n $${expense.totalAmount.toFixed(2)}`;
            return display;

        }
    }
    displayAction = (expense: ExpenseType) => {
        const {userStore} = this.props.rootStore;
        if (expense.settleUp && expense.paidBy.id == userStore.currentUser.id) {
            return "you paid";
        } else if (expense.settleUp) {
            return uppercaseName(expense.paidBy.name) + " paid";
        } else if (expense.paidBy.id == userStore.currentUser.id) {
            return "you are owed";

        } else {
            return "you borrowed";
        }
    }

    pullToRefreshAction = async () => {
        const {groupStore, userStore} = this.props.rootStore;
        const userId = userStore.currentUser.id;

        const groupId = groupStore.currentGroup.id;
        // added to make user experience better for pull down to refresh
        await delay(200);
        await groupStore.getGroupExpensesAPI(userId, groupId);
    }

    confirmDeleteExpense = (expense:ExpenseType) => {
        const {uiStore} = this.props.rootStore;
        this.setState(() => ({
            ExpenseToDelete: expense,
        }));
        const confirmTitle = expense.settleUp ? "Delete Settle up record?" : "Delete Expense?";
        const confirmMessage = expense.settleUp ? "This action will recalculate amount owed" : `${expense.name}`
        uiStore.openConfirmBox(confirmTitle,
            confirmMessage,
            this.deleteExpense);
    }

    deleteExpense = (expense: ExpenseType) => {
        const {groupStore, uiStore} = this.props.rootStore;
        uiStore.openConfirmBox("Delete Expense?",
            `${expense.name}`,
            groupStore.deleteExpense(this.state.ExpenseToDelete.id));
        uiStore.exitConfirmBox();
    }

    render(): ReactNode {
        const {groupStore, userStore} = this.props.rootStore;
        return (
            <Paper sx={{backgroundColor: "#f0f0f0", borderRadius: "1rem", maxHeight: `calc(100% - 11rem)`, overflowY: "scroll"}}>
                <PullToRefresh onRefresh={this.pullToRefreshAction}>
                    <List>
                        {groupStore.groupExpenses.map((expense: ExpenseType) => (
                            <ListItem key={expense.id}
                                      sx={{display: "flex",
                                          flexDirection: "row",
                                          justifyContent: "space-between"}}>
                                <ListItemButton onClick={() => {this.confirmDeleteExpense(expense)}}>
                                    <ListItemAvatar sx={{flexGrow: 1}}>
                                        <DateChip date={expense.date}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography={true}
                                        primary={<Typography paddingLeft={1} variant={"h4"}>{expense.name}</Typography>}
                                        secondary={
                                            <Typography paddingLeft={1} variant={"body1"}>
                                                {this.displaySecondaryText(expense)}
                                            </Typography>
                                        }
                                        sx={{flexGrow: 10}}
                                    />
                                    <ListItemText
                                        disableTypography={true}
                                        primary={
                                            <Typography
                                                paddingLeft={3}
                                                variant={"body2"}
                                                textAlign={"right"}
                                                color={expense.paidBy.id == userStore.currentUser.id
                                                    ? Theme.palette.success.main
                                                    : Theme.palette.error.main
                                                }
                                            >
                                                {this.displayAction(expense)}
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
                                                ${expense.owed.toFixed(2)}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </PullToRefresh>
            </Paper>
        );
    }
}