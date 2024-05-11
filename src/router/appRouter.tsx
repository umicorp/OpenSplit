import React from "react";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../error-page";
import Group from "../routes/group";
import {Account} from "../routes/account";
import {Home} from "../components/Home";
import {Groups} from "../components/Groups";
import Learn from "../routes/learn";


export const AppRouter =  createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <ErrorPage />
        },
        {
            path: "groups",
            element: <Groups  />,
            errorElement: <ErrorPage />
        },
        {
            path: "groups/:groupId",
            element: <Group />,
            errorElement: <ErrorPage />
        },
        {
            path: "account",
            element: <Account />,
            errorElement: <ErrorPage />
        },
        {
            path: "learn",
            element: <Learn />,
        errorElement: <ErrorPage />
        },
    ]);

