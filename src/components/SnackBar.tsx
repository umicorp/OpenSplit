import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {inject, observer} from "mobx-react";

@inject("rootStore")
@observer
export class GenericSnackbar extends React.Component<any, any> {

    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }


    render(): ReactNode {
        const {uiStore} = this.props.rootStore;
        return (
        <div>
            <Snackbar
                open={uiStore.isGenericSnackbarOpen}
                autoHideDuration={1500}
                onClose={uiStore.closeGenericSnackbar}
                message={uiStore.isGenericSnackbarMessage}
            />
        </div>
    );
}
}