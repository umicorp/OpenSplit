import React, {ReactNode} from "react";
import {Provider} from "mobx-react";
import {AppRouter} from "../router/AppRouter";
import {RootStore} from "../store/RootStore";

interface OpenSplitProps {
    rootStore: RootStore
}

export class OpenSplit extends React.Component<OpenSplitProps> {
    render(): ReactNode {
        return (
            <Provider rootStore={this.props.rootStore}>
                <AppRouter />
            </Provider>
        );
    }
}