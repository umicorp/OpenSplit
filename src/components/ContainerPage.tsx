import React from "react";
import {NavigationBar} from "./NavigationBar";
import {inject, observer} from "mobx-react";
import {Paper} from "@mui/material";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class ContainerPage extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        const styles = {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "calc(90vh - 2rem)",
            padding: "1rem"
        };

        return (
            <Box
                height={"100vh"}
                width={"100vw"}
                display={"flex"}
                flexDirection={"column"}
            >
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
