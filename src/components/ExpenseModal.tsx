import {inject, observer} from "mobx-react";
import * as React from "react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import {Box, Button, FormControl, FormLabel, InputAdornment, Modal, TextField} from "@mui/material";
import {ExpenseType, UserAmountsType} from "../store/Types";

type ExpenseAPIType = {
    name: string
    paidby: number
    useramounts: UserAmountsType []
    groupid: number
    totalamount: number

}

@inject("rootStore")
@observer
export class ExpenseModal extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            name: "",
            paidby: 0,
            useramounts: [],
            groupid: 0,
            totalamount: 0
        };
    }

    handleSubmit = (event: any): void => {
        const {uiStore, groupStore} = this.props.rootStore;
        event.preventDefault(); // Prevents the default form submission behaviour
        const expenseToCreate = this.buildExpense();
        groupStore.addExpenseAPI(expenseToCreate);
        uiStore.closeExpenseModal();
    }

    handleChange = (event: any): void => {
        const {name, value} = event.target;
        this.setState((state: any) => ({
            ...this.state, [name]: value
        }));
    }

    buildExpense = (): any => {
        const {userStore, groupStore} = this.props.rootStore;
        const divideBy = groupStore.currentGroupUsers.length;
        console.log("number of users to divide by", divideBy)
        const usersInGroup = groupStore.currentGroupUsers;

        const expense: ExpenseType = {
            id: 0,
            // Need to add logic here when you can split different ways
            owed: parseFloat(this.state.totalamount) / divideBy,
            name: this.state.name,
            paidBy: userStore.currentUser,
            participants: [],
            groupId: groupStore.currentGroup.id,
            totalAmount: parseFloat(this.state.totalamount)
        };
        for (const user of usersInGroup) {
            expense.participants.push({userId: user.id, amount: this.state.totalamount / divideBy});
        }
        console.log("Expense data submitted:", expense);
        return expense;

    }

    render(): ReactNode {
        const style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            spacing: 10
        };
        const {uiStore} = this.props.rootStore;
        return (
            <Modal
                open={uiStore.isExpenseModalOpen}
                onClose={uiStore.closeExpenseModal}
            >
                <Box sx={style}>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl sx={style}>
                            <FormLabel id="modal-modal-title" component="h2">Add a Expense</FormLabel>
                            <TextField
                                required
                                type="text"
                                id="outlined-basic"
                                label="Name"
                                name="name"
                                variant="outlined"
                                onChange={this.handleChange}
                                margin="normal">
                            </TextField>
                            <TextField
                                name="totalamount"
                                required
                                label="You Paid"
                                type="number"
                                id="outlined-basic"
                                variant="outlined"
                                margin="normal"
                                onChange={this.handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputMode: 'numeric',
                                }}
                            />
                            <Button type="submit">Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        );
    }
}