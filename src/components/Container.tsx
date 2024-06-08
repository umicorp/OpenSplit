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
import {ConfirmBox} from "./Confirm";

@inject("rootStore")
@observer
export class ContainerPage extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        const {uiStore} = this.props.rootStore;
        const isGroupPage = this.props.location.pathname.startsWith("/groups/")
        const contentHeight = isGroupPage
            ? `calc(100% - 4rem)`
            : `calc(100% - 7.5rem)`
        return (
            <Box
                height={"100vh"}
                width={"100vw"}
                display={"flex"}
                flexDirection={"column"}
            >
                {!isGroupPage
                    && <AppBar position="static" sx={{minHeight: "3.5rem", maxHeight:"3.5rem"}}>
                            <Toolbar>
                                <Typography align="center" variant="h1"
                                            component="div" sx={{paddingBottom: "0.25rem", margin: "0 auto"}}>
                                    {uiStore.header}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                }
                <ExpenseModal/>
                <GroupModal/>
                <UserModal/>
                <UserGroupModal/>
                <GenericSnackbar/>
                <ConfirmBox/>
                <Box sx={{maxHeight: contentHeight, minHeight: contentHeight, padding: "0.5rem 0.5rem 0 0.5rem"}}>
                    {this.props.children}
                </Box>
                <Paper elevation={3} sx={{minHeight: "fit-content", maxHeight: "fit-content"}}>
                    <NavigationBar {...this.props}/>
                </Paper>
            </Box>
        );
    }
}
