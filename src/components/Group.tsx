import * as React from "react";
import {ReactNode} from "react";
import {Button, ListItemButton, Paper, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import {ExpenseType} from "../store/Types";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Theme} from "../theme/Theme";
import {delay, uppercaseName} from "../helpers/Common";
import dayjs from "dayjs";
import PullToRefresh from "react-simple-pull-to-refresh";
import {DateChip} from "./DateChip";
import {Expense} from "../../server/models/Model";

@inject("rootStore")
@observer
export class Group extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            ExpenseToDelete: null,
        };
    }

    settleUp = () => {
        const {groupStore, uiStore} = this.props.rootStore;

        if (groupStore.userGroupBalance >= 0) {
            uiStore.openGenericSnackbar("You do not owe a balance");

        } else {
            const balance = Math.abs(groupStore.userGroupBalance).toFixed(2);
            uiStore.openConfirmBox("Do you want to Settle up?",
                `Settle up balance of ${balance}`,
                this.createExpense);

        }
    }

    buildSettleUp = () => {
        const {userStore, groupStore} = this.props.rootStore;
        const divideBy = groupStore.currentGroupUsers.length;
        const usersInGroup = groupStore.currentGroupUsers;
        const currentDate = dayjs();
        const today = currentDate.toISOString().split("T", 1)[0];

        const settleExpense: ExpenseType = {
            id: 0,
            owed: Number(Math.abs(groupStore.userGroupBalance).toFixed(2)),
            name: "Settled Up",
            date: today,
            paidBy: userStore.currentUser,
            participants: [],
            groupId: groupStore.currentGroup.id,
            settleUp: true,
            totalAmount: Number(Math.abs(groupStore.userGroupBalance).toFixed(2))
        };
        for (const user of usersInGroup) {
            settleExpense.participants.push({
                userId: user.id,
                amount: Number(Math.abs(groupStore.userGroupBalance).toFixed(2)) / divideBy
            });
        }
        return settleExpense;

    }

    createExpense = () => {
        const {groupStore, uiStore} = this.props.rootStore;
        const settleUpToCreate = this.buildSettleUp();
        groupStore.addExpenseAPI(settleUpToCreate);
        uiStore.exitConfirmBox();
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
            <Box sx={{height: "100%"}}>
                <Paper elevation={1} sx={{backgroundColor: "#e6e6e6", borderRadius: "1rem", maxHeight: "8rem", minHeight: "8rem"}}>
                    <Typography sx={{fontSize: "2rem", paddingTop: "1.5rem", paddingLeft: "1.5rem"}} color={Theme.palette.primary.main}>
                        {groupStore.currentGroup.name}
                    </Typography>
                    {
                        groupStore.userGroupBalance > 0 &&
                        <Typography sx={{paddingLeft: "1.5rem", paddingTop: "0.25rem"}} variant="h6" color={Theme.palette.success.main}>
                            You are owed ${Math.abs(groupStore.userGroupBalance).toFixed(2)}
                        </Typography>
                    }
                    {
                        groupStore.userGroupBalance == 0 &&
                        <Typography sx={{paddingLeft: "1.5rem", paddingTop: "0.25rem"}} variant="h6" color={Theme.palette.text.primary}>
                            All Settled Up!
                        </Typography>
                    }
                    {
                        groupStore.userGroupBalance < 0 &&
                        <Typography sx={{paddingLeft: "1.5rem", paddingTop: "0.25rem"}} variant="h6" color={Theme.palette.error.main}>
                            You owe ${Math.abs(groupStore.userGroupBalance).toFixed(2)}
                        </Typography>
                    }
                </Paper>
                <Box sx={{direction:"rtl", margin: "-1rem 1rem 1rem 1rem", display: "flex", flexDirection: "row", maxWidth: "40rem", overflowX: "scroll"}}>
                    <Button sx={{maxWidth: "fit-content", minHeight: "2rem", maxHeight: "2rem", mx:"0.25rem"}} variant="contained" href="#contained-buttons" onClick={this.settleUp}>
                        Settle up
                    </Button>
                    {process.env.NODE_ENV != "production" &&
                        <Button variant="contained" sx={{maxWidth: "fit-content", minHeight: "2rem", maxHeight: "2rem", mx:"0.25rem"}} onClick={() => console.log(this.props.rootStore)}>TEST</Button>
                    }
                </Box>
                { groupStore.groupExpenses.length == 0
                    ? <Typography textAlign={"center"}> Add Some Expenses To Get Started! </Typography>
                    :
                <Paper sx={{backgroundColor: "#f0f0f0", borderRadius: "1rem", maxHeight: `calc(100% - 11rem)`, overflowY: "scroll"}}>
                    <PullToRefresh onRefresh={this.pullToRefreshAction}>
                    <List>
                        {groupStore.groupExpenses.map((expense: ExpenseType) => (
                            <ListItem key={expense.id}
                                      sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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
                }
            </Box>


        );
    }
}