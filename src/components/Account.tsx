import * as React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import {UserType} from "../store/Types";
import Box from "@mui/material/Box";


@inject("rootStore")
@observer
export class Account extends React.Component<any, any> {

    constructor(props: RootStoreProps) {
        super(props);
    }

    componentDidMount() {
        const { uiStore } = this.props.rootStore;
        uiStore.setHeader("Account");
    }

    render(): ReactNode {
        const { userStore } = this.props.rootStore;
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <FormControl fullWidth>
                    <InputLabel id="user-label">Current User</InputLabel>
                    <Select
                        labelId="user-label"
                        value={userStore.currentUser ? userStore.currentUser.name : ""}
                        label="Current User"
                        onChange={(e) => userStore.setCurrentUser(e.target.value)}
                    >
                        {userStore.users.map((user: UserType) => (
                            <MenuItem key={user.id} value={user.name}>
                                {user.name[0].toUpperCase() + user.name.slice(1).toLowerCase()}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        );
    }
}