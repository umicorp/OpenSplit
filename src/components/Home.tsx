import React from "react";
import Avatar from "@mui/material/Avatar";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";

@inject("rootStore")
@observer
export class Home extends React.Component<any,any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                TEST
            </div>
        );
    }
}