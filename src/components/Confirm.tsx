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
            <div>
                <Dialog open={uiStore.isConfirmBoxOpen}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Modal title
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={uiStore.closeConfirmBox}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Settle up? {uiStore.isConfirmBoxMessage}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={uiStore.closeConfirmBox}>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}