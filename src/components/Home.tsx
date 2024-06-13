import React from "react";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import {AlertBar} from "./Alert";
import {Alert, Typography} from "@mui/material";
import {Theme} from "../theme/Theme";

@inject("rootStore")
@observer
export class Home extends React.Component<any,any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    componentDidMount() {
        const { uiStore } = this.props.rootStore;
        uiStore.setHeader("OpenSplit");
    }

    render(): ReactNode {
        const { uiStore } = this.props.rootStore;
        return (
            <div>
                {uiStore.isAlert
                ? <AlertBar title="Error" message="Backend Not Reachable" severity="error"></AlertBar>
                :
                <Typography sx={{fontSize: "1rem", paddingTop: "1rem", paddingLeft: "1rem"}} color={Theme.palette.primary.main}>
                    Welcome. To get started create some Users, select a active user and create a Group.
                </Typography>
                }
            </div>
        );
    }
}