import {createTheme} from "@mui/material";

export const Theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#009688",
        },
        secondary: {
            main: "#80cbc4",
        },
    },
    typography: {
        h1: {
            fontSize: "2.25rem",
        },
        h2: {
            fontSize: "2rem",
        },
        h3: {
            fontSize: "1.75rem",
        },
        h4: {
            fontSize: "1.5rem",
        },
        h5: {
            fontSize: "1.25rem",
        },
        h6: {
            fontSize: "1rem",
        },
    },
    components: {},
});