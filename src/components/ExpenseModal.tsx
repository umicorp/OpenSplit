import {inject, observer} from "mobx-react";
import * as React from "react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import {Box, Button, FormControl, FormLabel, InputAdornment, Modal, TextField} from "@mui/material";
import {ExpenseType, UserAmountsType} from "../store/Types";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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
            totalamount: 0,
            date: "",
            amountError: false
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
    handleDateChange = (event: any): void => {
        const date = event.$d.toISOString().split('T', 1)[0]
        this.setState((state: any) => ({
            ...this.state, ["date"]: date
        }));
    }

    handleChangeAmount = (event: any): void => {
        const {name, value} = event.target;
        const decimalNumber = /^\d*\.?\d{1,2}$/;
        const validateValue = value.match(decimalNumber)

        if (validateValue){
            // clear error message
            this.setState((state: any) => ({
                ...this.state, ["amountError"]: false,
                [name]: value
            }));

        } else if (validateValue === null){
            this.setState((state: any) => ({
                ...this.state, ["amountError"]: true
            }));
        }
    }

    buildExpense = (): any => {
        const {userStore, groupStore} = this.props.rootStore;
        const divideBy = groupStore.currentGroupUsers.length;
        const usersInGroup = groupStore.currentGroupUsers;

        const expense: ExpenseType = {
            id: 0,
            // Need to add logic here when you can split different ways
            owed: parseFloat(this.state.totalamount) / divideBy,
            name: this.state.name,
            paidBy: userStore.currentUser,
            date: this.state.date,
            participants: [],
            groupId: groupStore.currentGroup.id,
            settleUp: false,
            totalAmount: parseFloat(this.state.totalamount)
        };
        for (const user of usersInGroup) {
            expense.participants.push({userId: user.id, amount: this.state.totalamount / divideBy});
        }
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
                                >
                            </TextField>
                            <TextField
                                name="totalamount"
                                required
                                label="You Paid"
                                error={this.state.amountError}
                                helperText={this.state.amountError ? "Please Enter a Number" : ""}
                                id="outlined-basic"
                                variant="outlined"
                                margin="normal"
                                onChange={this.handleChangeAmount}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker name="date" maxDate={dayjs()} defaultValue={dayjs(new Date())} onChange={this.handleDateChange} sx={{marginTop:"1rem"}}  />
                            </LocalizationProvider>
                            <Button type="submit" disabled={this.state.amountError} >Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        );
    }
}