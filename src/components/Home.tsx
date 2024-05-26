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
                TEST
            </div>
        );
    }
}