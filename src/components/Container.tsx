import React from "react";
import {NavigationBar} from "./NavigationBar";
import {inject, observer} from "mobx-react";
import {AppBar, Paper, Toolbar, Typography} from "@mui/material";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";
import {ExpenseModal} from "./ExpenseModal";
import {GroupModal} from "./GroupModal";
import {UserModal} from "./UserModal";
import {UserGroupModal} from "./UserGroupModal";
import {GenericSnackbar} from "./SnackBar";

@inject("rootStore")
@observer
export class ContainerPage extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        const { uiStore } = this.props.rootStore;
        return (
            <Box
                height={"100vh"}
                width={"100vw"}
                display={"flex"}
                flexDirection={"column"}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography align="center" variant="h1" component="div" sx={{ flexGrow: 1, paddingBottom: "0.25rem", paddingTop: "0.75rem"}}>
                            { uiStore.header }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <ExpenseModal />
                <GroupModal />
                <UserModal />
                <UserGroupModal/>
                <GenericSnackbar/>
                <Box flexGrow={10} m={2}>
                    {this.props.children}
                </Box>
                <Paper elevation={3}>
                    <NavigationBar {...this.props} />
                </Paper>
            </Box>
        );
    }
}
