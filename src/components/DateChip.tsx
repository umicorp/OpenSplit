import * as React from "react";
import {ReactNode} from "react";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import {Typography} from "@mui/material";


export class DateChip extends React.Component<any, any> {
    constructor(props: { date: string }) {
        super(props);
    }

    render(): ReactNode {
        return (
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0.25rem",
                backgroundColor: "#bdbdbd",
                width: "3rem",
                borderRadius: "0.5rem",
                letterSpacing: "0.05rem"
            }}
            >
                <Typography style={{marginRight: "auto", marginLeft: "auto"}}>
                    {dayjs(this.props.date, "YYYY-MM-DD").format("MMM")}
                </Typography>
                <Typography style={{marginRight: "auto", marginLeft: "auto"}}>
                    {dayjs(this.props.date, "YYYY-MM-DD").format("DD")}
                </Typography>
            </Box>
        );
    }
}