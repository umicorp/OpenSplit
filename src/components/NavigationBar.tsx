import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Paper} from "@mui/material";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {ReactNode} from "react";
import {RootStoreProps} from "../store/RootStore";

@inject("rootStore")
@observer
export class NavigationBar extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render(): ReactNode {
        return (
                <BottomNavigation
                    showLabels
                    value={this.props.location.pathname}
                    sx={{margin: "0.5rem"}}
                >
                    <BottomNavigationAction
                        label="Home"
                        icon={<PersonIcon />}
                        component={Link}
                        to={"/"}
                        value={"/"}
                    />
                    <BottomNavigationAction
                        label="Groups"
                        icon={<GroupIcon />}
                        component={Link}
                        to={"/groups"}
                        value={"/groups"}
                    />
                    {/*<BottomNavigationAction label="Activity" icon={<ShowChartIcon />} href={"/debug"} />*/}
                    <BottomNavigationAction
                        label="Account"
                        icon={<AccountCircleIcon />}
                        component={Link}
                        to={"/account"}
                        value={"/account"}
                    />
                </BottomNavigation>
        );
    }
}