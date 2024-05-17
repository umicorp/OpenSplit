import {inject, observer} from "mobx-react";
import * as React from "react";
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {
    Button,
    FormControl,
    FormLabel,
    InputAdornment,
    InputLabel,
    Modal,
    Box,
    OutlinedInput,
    TextField, createTheme
} from "@mui/material";
import axios from "axios";
import GroupStore from "../store/GroupStore";

type UserAmountsType = {
    userid: number
    amount: number
}

type ExpenseType = {
    name:string
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
        }
    }

    handleSubmit = (event: any): void => {
        const { uiStore, userStore, groupStore } = this.props.rootStore
        event.preventDefault(); // Prevents the default form submission behaviour
        const expenseToCreate = this.buildExpense()
        this.createExpense(expenseToCreate);
        uiStore.closeExpenseModal();
    }

    handleChange = (event:any): void => {
        const { name, value } = event.target;
        this.setState((state: any) => ({
           ...this.state, [name]: value
        }));
    }

    createExpense = (expense:any): void => {
        const { userStore ,groupStore } = this.props.rootStore;

        axios.post('http://localhost:3001/api/expense', expense)
            .then(function (response) {
                groupStore.getGroupExpenses(userStore.currentUser.id, groupStore.currentGroup.id)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    buildExpense = ():any => {
        const { userStore, groupStore } = this.props.rootStore;

        const expense: ExpenseType = {
            name: this.state.name,
            paidby: userStore.currentUser.id,
            useramounts:[],
            groupid: groupStore.currentGroup.id,
            totalamount: this.state.totalamount
        }
        const divideBy = groupStore.usersInCurrentGroup.length
        const usersInGroup = groupStore.usersInCurrentGroup
        for (const user of usersInGroup) {
            expense.useramounts.push({userid: user.id, amount: this.state.totalamount/divideBy})
        }
        console.log("Expense data submitted:", expense)
        return expense

    }

    render(): ReactNode {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            spacing: 10
        };
        const { uiStore } = this.props.rootStore
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