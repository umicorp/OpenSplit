import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Groups from "./routes/groups";
import Group from "./routes/group";
import Accounts from "./routes/account";
import Learn from "./routes/learn";
import reportWebVitals from "./reportWebVitals";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import ErrorPage from "./error-page";
import {SimpleBottomNavigation} from "./components/BottomNavigation";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />

    },
    {
        path: "groups",
        element: <Groups />,
    },
    {
        path: "groups/:groupId",
        element: <Group />,
    },
    {
        path: "account",
        element: <Accounts />,
    },
    {
        path: "debug",
        element: <Learn />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <>
          <div style={{height: "90vh"}}>
              <RouterProvider router={router} />
          </div>
          <SimpleBottomNavigation/>
      </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
