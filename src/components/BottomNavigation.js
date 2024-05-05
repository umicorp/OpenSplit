import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    return (
        <Box>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Home" icon={<PersonIcon />} href={`/`}  />
                <BottomNavigationAction label="Groups" icon={<GroupIcon />} href={`/groups`} />
                <BottomNavigationAction label="Activity" icon={<ShowChartIcon />} />
                <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
            </BottomNavigation>
        </Box>
    );
}