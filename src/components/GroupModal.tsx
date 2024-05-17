import {inject, observer} from "mobx-react";
import * as React from "react";
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {Button, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class GroupModal extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
        const { uiStore } = this.props.rootStore;
        return (
            <Modal
                open={uiStore.isGroupModalOpen}
                onClose={uiStore.closeGroupModal}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Group
                    </Typography>
                </Box>
            </Modal>
        );
    }
}