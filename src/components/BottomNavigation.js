import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Paper} from "@mui/material";

export function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: "10%" }} elevation={3} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{height: "100%"}}
            >
                <BottomNavigationAction label="Home" icon={<PersonIcon />} href={`/`}  />
                <BottomNavigationAction label="Groups" icon={<GroupIcon />} href={`/groups`} />
                <BottomNavigationAction label="Activity" icon={<ShowChartIcon />} href={`/debug`} />
                <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} href={`/account`} />
            </BottomNavigation>
        </Paper>

    );
}