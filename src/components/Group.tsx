import * as React from "react";
import {ReactNode} from "react";
import {Button, Paper, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import {ExpenseType} from "../store/Types";
import Box from "@mui/material/Box";
import {Theme} from "../theme/Theme";
import dayjs from "dayjs";

import {ExpenseList} from "./ExpenseList";
import {AlertBar} from "./Alert";

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


    render(): ReactNode {
        const {groupStore, uiStore} = this.props.rootStore;

        return (
            <Box sx={{height: "100%"}}>
                {uiStore.isAlert
                    ? <AlertBar title="Error" message="Backend Not Reachable" severity="error"></AlertBar>
                    : ""
                }
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
                    <ExpenseList></ExpenseList>
                }
            </Box>
        );
    }
}