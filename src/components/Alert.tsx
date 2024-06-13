import * as React from "react";
import Alert from "@mui/material/Alert";
import {ReactNode} from "react";
import {AlertTitle} from "@mui/material";

export class AlertBar extends React.Component<any, any> {

    constructor(props: { title: string, message: string, severity: string }) {
        super(props);
    }
    render(): ReactNode {
        return (
            <Alert severity={this.props.severity}>
                <AlertTitle>{this.props.title}</AlertTitle>
                {this.props.message}
            </Alert>
        );
    }
}