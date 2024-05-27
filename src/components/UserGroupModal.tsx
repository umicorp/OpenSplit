import {inject, observer} from "mobx-react";
import * as React from "react";
import {RootStoreProps} from "../store/RootStore";
import {ReactNode} from "react";
import {Button, FormControl, FormLabel, MenuItem, Modal, NativeSelect, Select} from "@mui/material";
import Box from "@mui/material/Box";
import {UserType} from "../store/Types";

@inject("rootStore")
@observer
export class UserGroupModal extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            userToAdd: 0,
            groupToAdd: 0,
        };
    }

    componentDidMount() {
        const { uiStore } = this.props.rootStore;
        uiStore.setHeader("Groups");
    }

    handleSubmit = (event: any): void => {
        const { uiStore, userStore } = this.props.rootStore;
        event.preventDefault(); // Prevents the default form submission behaviour
        this.addUserToGroup()
        console.log("Form data submitted:", this.state);
        uiStore.closeUserGroupModal();
    }

    handleChange = (event:any): void => {
        const { groupStore } = this.props.rootStore;
        this.setState((state: any) => ({
            userToAdd: event.target.value,
            groupToAdd: groupStore.currentGroup.id
        }));
    }

    addUserToGroup = (): void => {
        const { groupStore } = this.props.rootStore;
        groupStore.addUserToGroupAPI(this.state.userToAdd, this.state.groupToAdd)
    }

    render(): ReactNode {
        const style = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
        };
        const { uiStore, userStore, groupStore } = this.props.rootStore;

        return (
            <Modal
                open={uiStore.isUserGroupModalOpen}
                onClose={uiStore.closeUserGroupModal}
            >
                <Box sx={style}>
                    <form onSubmit={this.handleSubmit}>
                        <FormControl sx={style}>
                            <FormLabel>Add User to { groupStore.currentGroup ? groupStore.currentGroup.name: "umi" }</FormLabel>
                            <Select label="Users" defaultValue="" onChange={this.handleChange}>
                                {userStore.users.map((user: UserType) => (
                                <MenuItem key={user.id} value={user.id}>{user.name[0].toUpperCase() + user.name.substr(1).toLowerCase()}</MenuItem>
                            ))}
                            </Select>
                            <Button type="submit">Submit</Button>
                        </FormControl>
                    </form>
                </Box>
            </Modal>
        );
    }
}