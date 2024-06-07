import * as React from "react";
import {ReactNode} from "react";
import {Button, Chip, Typography} from "@mui/material";
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

@inject("rootStore")
@observer
export class Group extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    settleUp = () => {
        const {groupStore, uiStore} = this.props.rootStore;

        if (groupStore.userGroupBalance >= 0) {
            uiStore.openGenericSnackbar(`You do not owe a balance`);

        } else{
            uiStore.openConfirmBox(`Do you want to Settle up?`,
                `Settle up balance of ${Math.abs(groupStore.userGroupBalance)}`,
                this.createExpense)

        }
    }

    buildSettleUp = () => {
        const {userStore, groupStore} = this.props.rootStore;
        const divideBy = groupStore.currentGroupUsers.length;
        const usersInGroup = groupStore.currentGroupUsers;
        const currentDate = dayjs();
        const today = currentDate.toISOString().split('T', 1)[0]

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
            settleExpense.participants.push({userId: user.id, amount: Number(Math.abs(groupStore.userGroupBalance).toFixed(2)) / divideBy});
        }
        console.log("Settle up data submitted:", settleExpense);
        return settleExpense;

    }

    createExpense  = () => {
        const {groupStore, uiStore} = this.props.rootStore;
        const settleUpToCreate = this.buildSettleUp()
        groupStore.addExpenseAPI(settleUpToCreate)
        uiStore.exitConfirmBox()
    }


    displaySecondaryText = (expense: ExpenseType) : string => {
        if (expense.settleUp){
            const {groupStore} = this.props.rootStore;
            const usersInGroup = groupStore.currentGroupUsers;
            const usersToBePaid: string[] = []
            for (const user of usersInGroup) {
                if (expense.paidBy.id != user.id ){
                    usersToBePaid.push(uppercaseName(user.name))
                }
            }
            const display = `${uppercaseName(expense.paidBy.name)} paid \n ${usersToBePaid}`
            return display
        } else {
            const display = `${uppercaseName(expense.paidBy.name)} paid \n $${expense.totalAmount}`
            return display

        }
    }
    displayAction = (expense: ExpenseType) => {
        const {userStore} = this.props.rootStore;
        if (expense.settleUp && expense.paidBy.id == userStore.currentUser.id ) {
            return  "you paid"
        }
        else if (expense.settleUp){
            return  uppercaseName(expense.paidBy.name) + " paid"
        }
        else if (expense.paidBy.id == userStore.currentUser.id){
            return "you are owed"

        } else {
            return "you borrowed"
        }
    }

    pullToRefreshAction = async () =>{
        const { groupStore, userStore } = this.props.rootStore;
        const userId = userStore.currentUser.id

        const groupId = groupStore.currentGroup.id
        // added to make user experience better for pull down to refresh
        await delay(200);
        await groupStore.getGroupExpensesAPI(userId, groupId)
    }

    render(): ReactNode {
        const {groupStore, userStore} = this.props.rootStore;

        return (
            <PullToRefresh onRefresh={this.pullToRefreshAction} >
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <Box sx={{flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Button variant="contained" href="#contained-buttons" onClick={this.settleUp}>
                    Settle up
                </Button>
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
                                <DateChip date={expense.date} />
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
                        </ListItem>
                    ))}
                </List>
                {process.env.NODE_ENV == "production"
                ? ""
                : <Button onClick={() => console.log(this.props.rootStore)}>TEST</Button>
                }
            </Box>
            </PullToRefresh>

                );
    }
}