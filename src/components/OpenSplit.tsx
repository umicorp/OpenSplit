import React, {ReactNode} from "react";
import {Provider} from "mobx-react";
import {AppRouter} from "../router/AppRouter";
import {RootStore} from "../store/RootStore";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Theme} from "../theme/Theme";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface OpenSplitProps {
    rootStore: RootStore
}

export class OpenSplit extends React.Component<OpenSplitProps> {
    render(): ReactNode {
        return (
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                <Provider rootStore={this.props.rootStore}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <AppRouter />
                    </LocalizationProvider>
                </Provider>
            </ThemeProvider>
        );
    }
}