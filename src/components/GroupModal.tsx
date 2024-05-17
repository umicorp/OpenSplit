import {inject, observer} from "mobx-react";
import * as React from "react";
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {Button, FormControl, FormLabel, Modal, TextField} from "@mui/material";
import Box from "@mui/material/Box";

@inject("rootStore")
@observer
export class GroupModal extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            groupToAdd: "",
        };
    }

    handleSubmit = (event: any): void => {
        const { uiStore, groupStore } = this.props.rootStore;
        event.preventDefault(); // Prevents the default form submission behaviour
        groupStore.createGroup(this.state.groupToAdd);
        uiStore.closeGroupModal();
    }

    handleChange = (event:any): void => {
        this.setState((state: any) => ({
            groupToAdd: event.target.value,
        }));
    }

    render(): ReactNode {
        const style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
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
                    <form onSubmit={this.handleSubmit}>
                        <FormControl sx={style}>
                            <FormLabel>Create Group</FormLabel>
                            <TextField
                                required
                                type="text"
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={this.handleChange}>
                            </TextField>
                            <Button type="submit">Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        );
    }
}