import React from "react";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";

@inject("rootStore")
@observer
export class Home extends React.Component<any,any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    componentDidMount() {
        const { uiStore, groupStore } = this.props.rootStore;
        uiStore.setHeader("OpenSplit");
    }

    render(): ReactNode {
        return (
            <div>
                Welcome. To get started create some Users, select a active user and create a Group.
            </div>
        );
    }
}