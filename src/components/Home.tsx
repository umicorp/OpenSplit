import React from "react";
import Avatar from "@mui/material/Avatar";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class Home extends React.Component {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode{
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <Avatar variant="square" src="/splitwise_logo_2.png" />
                <button onClick={() => console.log(this.props)}>TEST</button>
            </Box>
        );
    }
}