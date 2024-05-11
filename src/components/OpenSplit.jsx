import React from "react";
import SimpleBottomNavigation from "./BottomNavigation";
import {AppRouter} from "../router/appRouter";
import {Paper} from "@mui/material";
import RootStore from "../store/root-store";
import {Provider} from "mobx-react";
import {RouterProvider} from "react-router-dom";

export const rootStore = new RootStore()

export default function OpenSplit() {
    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: `calc(90vh - 2rem)`,
        padding: "1rem"
    }

    return (
        <Provider rootStore={rootStore}>
            <Paper sx={styles}>
                <RouterProvider router={AppRouter}/>
            </Paper>
            <SimpleBottomNavigation/>
        </Provider>
    );
}