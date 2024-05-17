import React from "react";
import {RootStoreProps} from "../store/RootStore";
import Box from "@mui/material/Box";

export class ErrorPage extends React.Component<any, any> {
    constructor(props: RootStoreProps) {
        super(props);
    }

    render():JSX.Element {
        return (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column"}}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
            </Box>
        );
    }
}