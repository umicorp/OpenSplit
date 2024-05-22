import * as React from "react";
import {ReactNode} from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Menu, MenuItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {RootStoreProps} from "../store/RootStore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoneyRounded";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useLocation } from 'react-router-dom';

@inject("rootStore")
@observer
export class NavigationBar extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
        this.state = {
            isMenuOpen: false,
            anchorElement: null
        };
    }

    handleMenuOpen = (event: any): void => {
        this.setState(() => ({
            isMenuOpen: true,
            anchorElement: event.target
        }));
    }

    handleMenuClose = (): void => {
        this.setState(() => ({
            isMenuOpen: false,
            anchorElement: null
        }));
    }

    handleExpenseModalOpen = (): void => {
        const { uiStore } = this.props.rootStore;
        uiStore.openExpenseModal();
        this.handleMenuClose();
    }

    handleGroupModalOpen = (): void => {
        const { uiStore } = this.props.rootStore;
        uiStore.openGroupModal();
        this.handleMenuClose();
    }

    handleUserModalOpen = (): void => {
        const { uiStore } = this.props.rootStore;
        uiStore.openUserModal();
        this.handleMenuClose();
    }

    handleUserGroupModalOpen = (): void => {
        const { uiStore } = this.props.rootStore;
        uiStore.openUserGroupModal();
        this.handleMenuClose();
    }


    renderExpense = (): any => {
        const location = window.location.href
        const inGroup = location.includes("groups/")
        if (inGroup) {
            return (<Menu
                open={this.state.isMenuOpen}
                onClose={this.handleMenuClose}
                anchorEl={this.state.anchorElement}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                    <MenuItem onClick={this.handleUserGroupModalOpen}>
                        <GroupAddIcon sx={{marginRight: "1rem"}} />
                    Add User
                    </MenuItem>
                    <MenuItem onClick={this.handleExpenseModalOpen}>
                        <AttachMoneyIcon sx={{marginRight: "1rem"}}/>
                        Add Expense
                    </MenuItem>
            </Menu>
            )
        }
    }

    renderDefaultMenu = () => {
        const location = window.location.href
        const inGroup = location.includes("groups/")
        if (!inGroup) {
        return( <Menu
            open={this.state.isMenuOpen}
            onClose={this.handleMenuClose}
            anchorEl={this.state.anchorElement}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <MenuItem onClick={this.handleGroupModalOpen}>
                <GroupAddIcon sx={{marginRight: "1rem"}} />
                Create Group
            </MenuItem>
            <MenuItem onClick={this.handleUserModalOpen}>
                <PersonAddIcon sx={{marginRight: "1rem"}} />
                Create User
            </MenuItem>
        </Menu>)
            }
    }

    render(): ReactNode {
        const { userStore } = this.props.rootStore;
        return (
            <BottomNavigation
                showLabels
                value={this.props.location.pathname}
                sx={{margin: "0.5rem"}}
            >
                <BottomNavigationAction
                    label="Groups"
                    icon={<GroupIcon />}
                    component={Link}
                    to={"/groups"}
                    value={"/groups"}
                />
                <BottomNavigationAction
                    icon={<AddBoxIcon color="primary" fontSize={"large"}/>}
                    onClick={this.handleMenuOpen}
                    label=" "
                />
                <BottomNavigationAction
                    label="Account"
                    icon={ userStore.currentUser
                        ? <Typography variant={"h4"}>{userStore.currentUser.name[0].toUpperCase()}</Typography>
                        : <AccountCircleIcon />
                    }
                    component={Link}
                    to={"/account"}
                    value={"/account"}
                />
                    {
                        this.renderExpense()
                    }
                    {
                        this.renderDefaultMenu()
                    }

            </BottomNavigation>
        );
    }
}