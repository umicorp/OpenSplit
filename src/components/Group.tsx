import * as React from "react";
import {ReactNode} from "react";
import {Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import {ExpenseType} from "../store/Types";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class Group extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        const { groupId } = this.props.match.params;
        const { getGroupExpenses } = this.props.rootStore.groupStore;
        const { currentUser } = this.props.rootStore.userStore;
        getGroupExpenses(currentUser.id, groupId);
    }

    render(): ReactNode {
        const { groupStore } = this.props.rootStore;
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                {groupStore.currentGroup
                    && <Typography variant="h2"> {groupStore.currentGroup.name}</Typography>
                }
                <ul className="list">
                    {groupStore.groupExpenses.map((expense: ExpenseType) => (
                        <li className={"list"} key={expense.id}><a>{expense.paidBy.name} is
                            owed {expense.owed} {expense.name}</a></li>
                    ))}
                </ul>
            </Box>

        );
    }
}