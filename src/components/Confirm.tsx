import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {inject, observer} from "mobx-react";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class ConfirmBox extends React.Component<any, any> {

    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    render(): ReactNode {
        const {uiStore} = this.props.rootStore;
        return (
                <Dialog fullWidth maxWidth="md" open={uiStore.isConfirmBoxOpen}>
                <DialogTitle variant="h5">
                    {uiStore.isConfirmBoxTitle}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={uiStore.exitConfirmBox}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom variant="h6">
                            {uiStore.isConfirmBoxMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={uiStore.confirmAction}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}