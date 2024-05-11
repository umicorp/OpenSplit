import React from "react";
import Avatar from "@mui/material/Avatar";
import {inject, observer} from "mobx-react";

export const Home = observer((props) =>  {
    return (
        <div style={{backgroundColor: "hotpink", height: "100%"}}>
            <Avatar variant="square" src="/splitwise_logo_2.png" />
            <button onClick={() => console.log(props)}>TEST</button>
        </div>
    );
})