import React from "react";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import {Theme} from "../theme/Theme";
import { Typography } from "@mui/material";

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
                <Typography sx={{fontSize: "1rem", paddingTop: "1rem", paddingLeft: "1rem"}} color={Theme.palette.primary.main}>
                    Welcome. To get started create some Users, select a active user and create a Group.
                </Typography>
            </div>
        );
    }
}