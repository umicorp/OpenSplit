import React from "react";
import {NavigationBar} from "./NavigationBar";
import {inject, observer} from "mobx-react";
import {Paper} from "@mui/material";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";
import {ExpenseModal} from "./ExpenseModal";

@inject("rootStore")
@observer
export class ContainerPage extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    handleModalOpen = () => {
        this.setState((state: any) => ({
            isModalOpen: true
        }));
    }

    handleModalClose = () => {
        this.setState((state: any) => ({
            isModalOpen: false
        }));
    }

    render(): ReactNode {
        return (
            <Box
                height={"100vh"}
                width={"100vw"}
                display={"flex"}
                flexDirection={"column"}
            >
                <ExpenseModal isModalOpen={this.state.isModalOpen} onModalClose={this.handleModalClose}/>
                <Box flexGrow={10} m={2}>
                    {this.props.children}
                </Box>
                <Paper elevation={3}>
                    <NavigationBar {...this.props} onModalOpen={this.handleModalOpen}/>
                </Paper>
            </Box>
        );
    }
}
